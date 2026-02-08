import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';
import {PostHogProvider} from './providers';
import type {Metadata} from 'next';
import {Martian_Mono, Schibsted_Grotesk} from 'next/font/google';
import './globals.css';

const schibstedGrotesk = Schibsted_Grotesk({
	variable: '--font-schibsted_Grotesk',
	subsets: ['latin'],
});

const martianMono = Martian_Mono({
	variable: '--font-martian-mono',
	subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const siteTitle = 'DevEvent';
const siteDescription = "The Hub for every Dev Event you Mustn't Miss";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: siteTitle,
		template: `%s | ${siteTitle}`,
	},
	description: siteDescription,
	alternates: {
		canonical: '/',
	},
	openGraph: {
		type: 'website',
		url: '/',
		title: siteTitle,
		description: siteDescription,
		siteName: siteTitle,
		images: [
			{
				url: '/icons/logo.png',
				alt: siteTitle,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteTitle,
		description: siteDescription,
		images: ['/icons/logo.png'],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${schibstedGrotesk.variable} ${martianMono.variable} m-h-screen antialiased`}>
				<PostHogProvider>
					<Navbar />
					<div className='absolute inset-0 top-0 z-[-1] m-h-screen'>
						<LightRays
							raysOrigin='top-center-offset'
							raysColor='#5dfeca'
							raysSpeed={0.5}
							lightSpread={0.9}
							rayLength={1.4}
							followMouse={true}
							mouseInfluence={0.02}
							noiseAmount={0}
							distortion={0.01}
						/>
					</div>
					<main>{children}</main>
				</PostHogProvider>
			</body>
		</html>
	);
}
