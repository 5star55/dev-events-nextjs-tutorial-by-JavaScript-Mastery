"use server";

import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { isValidObjectId } from "mongoose";

export const getSimilarEventsBySlug = async (
	slug: string
): Promise<LeanEvent[]> => {
	try {
		await connectDB();

		// Find base event
		let event = await Event.findOne({ slug }).lean();
		if (!event && isValidObjectId(slug)) {
			event = await Event.findById(slug).lean();
		}

		if (!event) {
			return [];
		}

		// Find similar events by tags (exclude current event)
		const similarEvents = await Event.find({
			_id: { $ne: event._id },
			tags: { $in: event.tags || [] }
		})
			.select("title slug image tags date mode location time")
			.lean<LeanEvent[]>();

		return similarEvents;
	} catch (error) {
		console.error("Get similar events failed:", error);
		return [];
	}
};
