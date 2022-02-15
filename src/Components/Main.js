import React, { useState, useEffect } from "react";

const Main = () => {

    const materialsData = {
        raw: [
            {
                materialName: "Helium",
                producedBy: [],
                produces: ["Metallic Microlattice", "Stimulants", "Superfluid Coolant"]
            },

            {
                materialName: "Hydrogen",
                producedBy: [],
                produces: ["Antimatter Cells", "Computronic Substrate"]
            },

            {
                materialName: "Ice",
                producedBy: [],
                produces: ["Protein Paste", "Water"]
            },

            {
                materialName: "Methane",
                producedBy: [],
                produces: ["Graphene", "Protein Paste", "Silicon Carbide"]
            },

            {
                materialName: "Ore",
                producedBy: [],
                produces: ["Computronic Substrate", "Metallic Microlattice", "Refined Metals", "Teladianium"]
            },

            {
                materialName: "Silicon",
                producedBy: [],
                produces: ["Computronic Substrate", "Silicon Wafers", "Stimulants", "Silicon Carbide"]
            },

        ],

        tier1: [
            {
                materialName: "Antimatter Cells",
                producedBy: ["Hydrogen"],
                produces: ["Engine Parts", "Claytronics"]
            },

            {
                materialName: "Computronic Substrate",
                producedBy: ["Hydrogen", "Ore", "Silicon"],
                produces: []
            },

            {
                materialName: "Graphene",
                producedBy: ["Methane"],
                produces: ["Advanced Composites", "Hull Parts", "Plasma Conductors", "Quantum Tubes"]
            },

            {
                materialName: "Metallic Microlattice",
                producedBy: ["Helium", "Ore"],
                produces: ["Silicon Carbide"]
            },

            {
                materialName: "Protein Paste",
                producedBy: ["Ice", "Methane"],
                produces: ["Terran MRE"]
            },

            {
                materialName: "Refined Metals",
                producedBy: ["Ore"],
                produces: ["Advanced Composites", "Engine Parts", "Hull Parts", "Scanning Arrays"]
            },

            {
                materialName: "Silicon Wafers",
                producedBy: ["Silicon"],
                produces: ["Microchips", "Scanning Arrays", "Smart Chips"]
            },

            {
                materialName: "Stimulants",
                producedBy: ["Helium", "Silicon"],
                produces: []
            },

            {
                materialName: "Superfluid Coolant",
                producedBy: ["Helium"],
                produces: ["Plasma Conductors", "Quantum Tubes"]
            },

            {
                materialName: "Teladianium",
                producedBy: ["Ore"],
                produces: []
            },

            {
                materialName: "Water",
                producedBy: ["Ice"],
                produces: ["Chelt Meat", "Maja Snails", "Meat", "Scruffin Fruit", "Soja Beans", "Spices", "Sunrise Flowers", "Swamp Plant", "Wheat", "Medical Supplies", "Nostrop Oil", "Spacefuel"]
            },
        ],

        tier2: [
            {
                materialName: "Advanced Composites",
                producedBy: ["Graphene", "Refined Metals"],
                produces: ["Antimatter Converters", "Missile Components"]
            },

            {
                materialName: "Chelt Meat",
                producedBy: ["Water"],
                produces: []
            },

            {
                materialName: "Engine Parts",
                producedBy: ["Antimatter Cells", "Refined Metals"],
                produces: ["Drone Components"]
            },

            {
                materialName: "Hull Parts",
                producedBy: ["Graphene", "Refined Metals"],
                produces: ["Drone Components", "Missile Components", "Weapons Components"]
            },

            {
                materialName: "Maja Snails",
                producedBy: ["Water"],
                produces: ["Maja Dust", "Soja Husk"]
            },

            {
                materialName: "Meat",
                producedBy: ["Water"],
                produces: ["Food Ration"]
            },

            {
                materialName: "Microchips",
                producedBy: ["Silicon Wafers"],
                produces: ["Advanced Electronics", "Antimatter Converters", "Claytronics", "Drone Components", "Turret Components"]
            },

            {
                materialName: "Plasma Conductors",
                producedBy: ["Graphene", "Superfluid Coolant"],
                produces: ["Field Coils", "Shield Components", "Weapons Components"]
            },

            {
                materialName: "Quantum Tubes",
                producedBy: ["Graphene", "Superfluid Coolant"],
                produces: ["Advanced Electronics", "Claytronics", "Field Coils", "Shield Components", "Turret COmponents"]
            },

            {
                materialName: "Scanning Arrays",
                producedBy: ["Refined Metals", "Silicon Valleys"],
                produces: ["Drone Components", "Turret Components"]
            },

            {
                materialName: "Scruffin Fruit",
                producedBy: ["Water"],
                produces: []
            },

            {
                materialName: "Silicon Carbide",
                producedBy: ["Metallic Microlattice", "Methane", "Silicon"],
                produces: []
            },

            {
                materialName: "Smart Chips",
                producedBy: ["Silicon Wafers"],
                produces: []
            },

            {
                materialName: "Soja Beans",
                producedBy: ["Water"],
                produces: ["Soja Husk"]
            },

            {
                materialName: "Spices",
                producedBy: ["Water"],
                produces: ["Food Rations", "Maja Dust", "Medical Supplies", "Nostrop Oil", "Soja Husk", "Spaceweed",]
            },

            {
                materialName: "Sunrise Flowers",
                producedBy: ["Water"],
                produces: ["Nostrop Oil"]
            },

            {
                materialName: "Swamp Plant",
                producedBy: ["Water"],
                produces: ["Spaceweed"]
            },

            {
                materialName: "Terran MRE",
                producedBy: ["Protein Paste"],
                produces: []
            },

            {
                materialName: "Wheat",
                producedBy: ["Water"],
                produces: ["Food Ration", "Medical Supplies", "Spacefuel"]
            },

        ],

        tier3: [
            {
                materialName: "Advanced Electronics",
                producedBy: ["Microchips", "Quantum Tubes"],
                produces: []
            },

            {
                materialName: "Antimatter Converters",
                producedBy: ["Advanced Components", "Microchips"],
                produces: []
            },

            {
                materialName: "Claytronics",
                producedBy: ["Microchips", "Quantum Tubes", "Antimatter Cells"],
                produces: []
            },

            {
                materialName: "Drone Components",
                producedBy: ["Engine Parts", "Hull Parts", "Microchips", "Scanning Arrays"],
                produces: []
            },

            {
                materialName: "Field Coils",
                producedBy: ["Plasma Conductors", "Quantum Tubes"],
                produces: []
            },

            {
                materialName: "Food Rations",
                producedBy: ["Meat", "Spices", "Wheat"],
                produces: []
            },

            {
                materialName: "Maja Dust",
                producedBy: ["Maja Snails", "Spices"],
                produces: []
            },

            {
                materialName: "Medical Supplies",
                producedBy: ["Spices", "Wheat", "Water"],
                produces: []
            },

            {
                materialName: "Missile Components",
                producedBy: ["Advanced Composites", "Hull Parts"],
                produces: []
            },

            {
                materialName: "Nostrop Oil",
                producedBy: ["Spices", "Sunrise Flowers", "Water"],
                produces: []
            },

            {
                materialName: "Shield Components",
                producedBy: ["Plasma Conductors", "Quantum Tubes"],
                produces: []
            },

            {
                materialName: "Soja Husk",
                producedBy: ["Maja Snails", "Soja Beans", "Spices"],
                produces: []
            },

            {
                materialName: "Spacefuel",
                producedBy: ["Wheat", "Water"],
                produces: []
            },

            {
                materialName: "Spaceweed",
                producedBy: ["Spices", "Swamp Plant"],
                produces: []
            },

            {
                materialName: "Turret Components",
                producedBy: ["Microchips", "Quantum Tubes", "Scanning Arrays"],
                produces: []
            },

            {
                materialName: "Weapons Components",
                producedBy: ["Microchips", "Quantum Tubes", "Scanning Arrays"],
                produces: []
            }
        ]
    }

    const [hovering, setHovering] = useState("");

    useEffect(() => {
        // If we aren't hovering over anything, delete all lines
        if (hovering === ""){

        }
        // In any other case, establish the lines
        else {
            console.log(hovering);
        }
      }, [hovering]);

    function camalize(str) {
        return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
            return chr.toUpperCase();
        });
    }

    return (
        <div className="">
            <div className="grid">
                <div className="grid grid-cols-4">
                    <p className="text-2xl font-semibold underline decoration-1 underline-offset-4 text-center">Raw</p>
                    <p className="text-2xl font-semibold underline decoration-1 underline-offset-4 text-center">Tier 1</p>
                    <p className="text-2xl font-semibold underline decoration-1 underline-offset-4 text-center">Tier 2</p>
                    <p className="text-2xl font-semibold underline decoration-1 underline-offset-4 text-center">Tier 3</p>
                </div>
                <div className="grid grid-cols-4 py-24">
                    <div className="self-center">
                        <ul id="raw" className="space-y-4">
                            {materialsData.raw.map((material, index) => (
                                <li key={index} onMouseEnter={() => setHovering(material.materialName)} onMouseLeave={() => setHovering("")} className={camalize(material.materialName) + " text-center text-sm hover:font-bold cursor-pointer"}>{material.materialName}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="self-center">
                        <ul id="tier1" className="space-y-4">
                            {materialsData.tier1.map((material, index) => (
                                    <li key={index} onMouseEnter={() => setHovering(material.materialName)} onMouseLeave={() => setHovering("")} className={camalize(material.materialName) + " text-center text-sm hover:font-bold cursor-pointer"}>{material.materialName}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="self-center">
                        <ul id="tier2" className="space-y-4">
                            {materialsData.tier2.map((material, index) => (
                                    <li key={index} onMouseEnter={() => setHovering(material.materialName)} onMouseLeave={() => setHovering("")} className={camalize(material.materialName) + " text-center text-sm hover:font-bold cursor-pointer"}>{material.materialName}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="self-center">
                        <ul id="tier3" className="space-y-4">
                            {materialsData.tier3.map((material, index) => (
                                    <li key={index} onMouseEnter={() => setHovering(material.materialName)} onMouseLeave={() => setHovering("")} className={camalize(material.materialName) + " text-center text-sm hover:font-bold cursor-pointer"}>{material.materialName}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;