import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function FullBackground() {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: { color: { value: "transparent" } },
                fpsLimit: 60,
                particles: {
                    number: { value: 80, density: { enable: true, area: 800 } },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.2, random: true },
                    size: { value: { min: 1, max: 3 }, random: true },
                    move: { enable: true, speed: 0.2, random: true, outModes: "out" },
                },
                detectRetina: true,
            }}
        />
    );
}
