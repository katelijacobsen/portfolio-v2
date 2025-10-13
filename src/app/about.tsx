import React from 'react';

const AboutPage = () => {
    return (
        <main className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6">About Me</h1>
            <div className="max-w-2xl">
                <p className="mb-4">
                    Hello! I'm a passionate developer dedicated to creating meaningful digital experiences.
                </p>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">Background</h2>
                    <p>
                        [Your background information here]
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">Skills</h2>
                    <ul className="list-disc list-inside">
                        <li>Web Development</li>
                        <li>UI/UX Design</li>
                        <li>Problem Solving</li>
                        {/* Add more skills as needed */}
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default AboutPage;