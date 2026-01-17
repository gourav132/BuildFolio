import React from "react";
import {
    About,
    Contact,
    Experience,
    Hero,
    Navbar,
    Tech,
    Works,
    StaticBackground,
} from "../../../../components";

const ModernDark = () => {
    return (
        <div style={{ zoom: "64%" }} className="relative z-0 bg-primary">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Navbar />
                <Hero />
            </div>
            <About />
            <Experience />
            <Tech />
            <Works />
            <div className="relative z-0">
                <Contact />
                <StaticBackground />
            </div>
        </div>
    );
};

export default ModernDark;
