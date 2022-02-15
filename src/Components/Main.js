import React, { useState, useEffect } from "react";

const Main = () => {

    const materialsData = [
        {
            materialType: "raw",
            materialName: "Helium",
            producedBy: [],
            produces: ["Metallic Microlattice", "Stimulants", "Superfluid Coolant"]
        },

        {
            materialType: "raw",
            materialName: "Hydrogen",
            producedBy: [],
            produces: ["Antimatter Cells", "Computronic Substrate"]
        },

        {
            materialType: "raw",
            materialName: "Ice",
            producedBy: [],
            produces: ["Protein Paste", "Water"]
        },

        {
            materialType: "raw",
            materialName: "Methane",
            producedBy: [],
            produces: ["Graphene", "Protein Paste", "Silicon Carbide"]
        },

        {
            materialType: "raw",
            materialName: "Ore",
            producedBy: [],
            produces: ["Computronic Substrate", "Metallic Microlattice", "Refined Metals", "Teladianium"]
        },

        {
            materialType: "raw",
            materialName: "Silicon",
            producedBy: [],
            produces: ["Computronic Substrate", "Silicon Wafers", "Stimulants", "Silicon Carbide"]
        },

        {
            materialType: "tier1",
            materialName: "Antimatter Cells",
            producedBy: ["Hydrogen"],
            produces: ["Engine Parts", "Claytronics"]
        },

        {
            materialType: "tier1",
            materialName: "Computronic Substrate",
            producedBy: ["Hydrogen", "Ore", "Silicon"],
            produces: []
        },

        {
            materialType: "tier1",
            materialName: "Graphene",
            producedBy: ["Methane"],
            produces: ["Advanced Composites", "Hull Parts", "Plasma Conductors", "Quantum Tubes"]
        },

        {
            materialType: "tier1",
            materialName: "Metallic Microlattice",
            producedBy: ["Helium", "Ore"],
            produces: ["Silicon Carbide"]
        },

        {
            materialType: "tier1",
            materialName: "Protein Paste",
            producedBy: ["Ice", "Methane"],
            produces: ["Terran MRE"]
        },

        {
            materialType: "tier1",
            materialName: "Refined Metals",
            producedBy: ["Ore"],
            produces: ["Advanced Composites", "Engine Parts", "Hull Parts", "Scanning Arrays"]
        },

        {
            materialType: "tier1",
            materialName: "Silicon Wafers",
            producedBy: ["Silicon"],
            produces: ["Microchips", "Scanning Arrays", "Smart Chips"]
        },

        {
            materialType: "tier1",
            materialName: "Stimulants",
            producedBy: ["Helium", "Silicon"],
            produces: []
        },

        {
            materialType: "tier1",
            materialName: "Superfluid Coolant",
            producedBy: ["Helium"],
            produces: ["Plasma Conductors", "Quantum Tubes"]
        },

        {
            materialType: "tier1",
            materialName: "Teladianium",
            producedBy: ["Ore"],
            produces: []
        },

        {
            materialType: "tier1",
            materialName: "Water",
            producedBy: ["Ice"],
            produces: ["Chelt Meat", "Maja Snails", "Meat", "Scruffin Fruit", "Soja Beans", "Spices", "Sunrise Flowers", "Swamp Plant", "Wheat", "Medical Supplies", "Nostrop Oil", "Spacefuel"]
        },

        {
            materialType: "tier2",
            materialName: "Advanced Composites",
            producedBy: ["Graphene", "Refined Metals"],
            produces: ["Antimatter Converters", "Missile Components"]
        },

        {
            materialType: "tier2",
            materialName: "Chelt Meat",
            producedBy: ["Water"],
            produces: []
        },

        {
            materialType: "tier2",
            materialName: "Engine Parts",
            producedBy: ["Antimatter Cells", "Refined Metals"],
            produces: ["Drone Components"]
        },

        {
            materialType: "tier2",
            materialName: "Hull Parts",
            producedBy: ["Graphene", "Refined Metals"],
            produces: ["Drone Components", "Missile Components", "Weapons Components"]
        },

        {
            materialType: "tier2",
            materialName: "Maja Snails",
            producedBy: ["Water"],
            produces: ["Maja Dust", "Soja Husk"]
        },

        {
            materialType: "tier2",
            materialName: "Meat",
            producedBy: ["Water"],
            produces: ["Food Ration"]
        },

        {
            materialType: "tier2",
            materialName: "Microchips",
            producedBy: ["Silicon Wafers"],
            produces: ["Advanced Electronics", "Antimatter Converters", "Claytronics", "Drone Components", "Turret Components"]
        },

        {
            materialType: "tier2",
            materialName: "Plasma Conductors",
            producedBy: ["Graphene", "Superfluid Coolant"],
            produces: ["Field Coils", "Shield Components", "Weapons Components"]
        },

        {
            materialType: "tier2",
            materialName: "Quantum Tubes",
            producedBy: ["Graphene", "Superfluid Coolant"],
            produces: ["Advanced Electronics", "Claytronics", "Field Coils", "Shield Components", "Turret COmponents"]
        },

        {
            materialType: "tier2",
            materialName: "Scanning Arrays",
            producedBy: ["Refined Metals", "Silicon Valleys"],
            produces: ["Drone Components", "Turret Components"]
        },

        {
            materialType: "tier2",
            materialName: "Scruffin Fruit",
            producedBy: ["Water"],
            produces: []
        },

        {
            materialType: "tier2",
            materialName: "Silicon Carbide",
            producedBy: ["Metallic Microlattice", "Methane", "Silicon"],
            produces: []
        },

        {
            materialType: "tier2",
            materialName: "Smart Chips",
            producedBy: ["Silicon Wafers"],
            produces: []
        },

        {
            materialType: "tier2",
            materialName: "Soja Beans",
            producedBy: ["Water"],
            produces: ["Soja Husk"]
        },

        {
            materialType: "tier2",
            materialName: "Spices",
            producedBy: ["Water"],
            produces: ["Food Rations", "Maja Dust", "Medical Supplies", "Nostrop Oil", "Soja Husk", "Spaceweed",]
        },

        {
            materialType: "tier2",
            materialName: "Sunrise Flowers",
            producedBy: ["Water"],
            produces: ["Nostrop Oil"]
        },

        {
            materialType: "tier2",
            materialName: "Swamp Plant",
            producedBy: ["Water"],
            produces: ["Spaceweed"]
        },

        {
            materialType: "tier2",
            materialName: "Terran MRE",
            producedBy: ["Protein Paste"],
            produces: []
        },

        {
            materialType: "tier2",
            materialName: "Wheat",
            producedBy: ["Water"],
            produces: ["Food Ration", "Medical Supplies", "Spacefuel"]
        },

        {
            materialType: "tier3",
            materialName: "Advanced Electronics",
            producedBy: ["Microchips", "Quantum Tubes"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Antimatter Converters",
            producedBy: ["Advanced Components", "Microchips"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Claytronics",
            producedBy: ["Microchips", "Quantum Tubes", "Antimatter Cells"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Drone Components",
            producedBy: ["Engine Parts", "Hull Parts", "Microchips", "Scanning Arrays"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Field Coils",
            producedBy: ["Plasma Conductors", "Quantum Tubes"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Food Rations",
            producedBy: ["Meat", "Spices", "Wheat"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Maja Dust",
            producedBy: ["Maja Snails", "Spices"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Medical Supplies",
            producedBy: ["Spices", "Wheat", "Water"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Missile Components",
            producedBy: ["Advanced Composites", "Hull Parts"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Nostrop Oil",
            producedBy: ["Spices", "Sunrise Flowers", "Water"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Shield Components",
            producedBy: ["Plasma Conductors", "Quantum Tubes"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Soja Husk",
            producedBy: ["Maja Snails", "Soja Beans", "Spices"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Spacefuel",
            producedBy: ["Wheat", "Water"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Spaceweed",
            producedBy: ["Spices", "Swamp Plant"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Turret Components",
            producedBy: ["Microchips", "Quantum Tubes", "Scanning Arrays"],
            produces: []
        },

        {
            materialType: "tier3",
            materialName: "Weapons Components",
            producedBy: ["Microchips", "Quantum Tubes", "Scanning Arrays"],
            produces: []
        }
    ];


    const [hovering, setHovering] = useState("");

    useEffect(() => {
        // If we aren't hovering over anything, delete all lines
        if (hovering === "") {
        }
        // In any other case, establish the lines
        else {

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
                            {materialsData
                                .filter(material => material.materialType === "raw")
                                .map((material, index) => (
                                    <li key={index} onMouseEnter={() => setHovering(material.materialName)} onMouseLeave={() => setHovering("")} className={camalize(material.materialName) + " text-center text-sm hover:font-bold cursor-pointer"}>{material.materialName}</li>
                                ))}
                        </ul>
                    </div>
                    <div className="self-center">
                        <ul id="tier1" className="space-y-4">
                            {materialsData
                                .filter(material => material.materialType === "tier1")
                                .map((material, index) => (
                                    <li key={index} onMouseEnter={() => setHovering(material.materialName)} onMouseLeave={() => setHovering("")} className={camalize(material.materialName) + " text-center text-sm hover:font-bold cursor-pointer"}>{material.materialName}</li>
                                ))}
                        </ul>
                    </div>
                    <div className="self-center">
                        <ul id="tier2" className="space-y-4">
                            {materialsData
                                .filter(material => material.materialType === "tier2")
                                .map((material, index) => (
                                    <li key={index} onMouseEnter={() => setHovering(material.materialName)} onMouseLeave={() => setHovering("")} className={camalize(material.materialName) + " text-center text-sm hover:font-bold cursor-pointer"}>{material.materialName}</li>
                                ))}
                        </ul>
                    </div>
                    <div className="self-center">
                        <ul id="tier3" className="space-y-4">
                            {materialsData
                                .filter(material => material.materialType === "tier3")
                                .map((material, index) => (
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