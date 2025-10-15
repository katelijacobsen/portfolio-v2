import React from "react";

type Props = {
    params: {
        slug: string;
    };
};

export default function Page({ params }: Props) {
    const { slug } = params;

    if (slug !== "foo-festival") {
        return (
            <main style={{ padding: 48, fontFamily: "Inter, system-ui, sans-serif" }}>
                <h1>Project not found</h1>
                <p>No project matches "{slug}". Try visiting /projects/foo-festival.</p>
            </main>
        );
    }

    return (
        <main className="text-white">
            <header style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 36, margin: "0 0 8px" }}>Foo Festival — Single page site</h1>
                <p style={{ margin: 0, color: "#555" }}>
                    A concise, accessible single-page website for Foo Festival showcasing the event, lineup, tickets and contact information.
                </p>
            </header>

            <section style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 20, marginBottom: 8 }}>Project overview</h2>
                <p>
                    Foo Festival is a one-day music and culture event. The brief was to create a focused single-page website that communicates the festival identity,
                    presents essential information (lineup, schedule, venue, tickets) and converts visitors into ticket buyers — all while staying fast and accessible.
                </p>
            </section>

            <section style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 20, marginBottom: 8 }}>Problems to solve</h2>
                <ul style={{ marginTop: 8 }}>
                    <li>Communicate the festival tone and brand within a single scrollable page.</li>
                    <li>Make important information (date, lineup, ticket CTA, directions) easy to find.</li>
                    <li>Keep the site performant and resilient on slow mobile connections.</li>
                    <li>Ensure accessibility for screen readers and keyboard users.</li>
                    <li>Provide an easy editing workflow for content updates (dates, lineup).</li>
                </ul>
            </section>

            <section style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 20, marginBottom: 8 }}>Process overview</h2>
                <ol style={{ marginTop: 8 }}>
                    <li>Discovery: gathered requirements, reviewed existing assets (brand kit, copy, images) and prioritized content for a single page layout.</li>
                    <li>Wireframes: created a linear flow — hero → lineup → schedule → tickets → venue & travel → FAQ → contact/subscribe.</li>
                    <li>Design: designed a compact visual system focused on contrast, readable typography and clear CTAs.</li>
                    <li>Implementation: built a responsive React/Next.js single page with progressive image loading and semantic HTML.</li>
                    <li>QA & accessibility testing: keyboard navigation, color contrast checks and basic screen reader flows.</li>
                </ol>
            </section>

            <section style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 20, marginBottom: 8 }}>My tasks</h2>
                <ul style={{ marginTop: 8 }}>
                    <li>Converted wireframes to responsive UI components and layout in Next.js (app router).</li>
                    <li>Implemented hero section with clear ticket CTA and countdown to the event.</li>
                    <li>Built an accessible lineup section with progressive enhancement for long lists.</li>
                    <li>Integrated ticket CTA and simplified checkout flow via deep links to the ticket provider.</li>
                    <li>Optimized images and performance (lazy loading, optimized formats) and audited Lighthouse scores.</li>
                    <li>Performed accessibility fixes and delivered a style guide for future edits.</li>
                </ul>
            </section>

            <section style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 20, marginBottom: 8 }}>Final results</h2>
                <p>
                    The single-page site launched on schedule. Key outcomes:
                </p>
                <ul style={{ marginTop: 8 }}>
                    <li>Fast initial load and good Lighthouse performance (optimized assets and critical CSS).</li>
                    <li>Clear conversion path — ticket CTA is visible in the hero and repeated after key sections.</li>
                    <li>Accessible markup and keyboard-friendly navigation.</li>
                    <li>Site maintained as a small codebase making updates quick and low-risk.</li>
                </ul>
            </section>

            <section>
                <h2 style={{ fontSize: 20, marginBottom: 8 }}>Feedback</h2>
                <p style={{ marginTop: 8 }}>
                    Stakeholders reported the site felt "on-brand" and easy to navigate. Ticket conversion improved after launch thanks to clearer CTAs and simplified information
                    hierarchy. The client appreciated the small, maintainable codebase and documentation for future content updates.
                </p>
            </section>
        </main>
    );
}