import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Xarrow from "react-xarrows";

const Title = styled.p`
    font-size: 40px;
    text-align: center;
`

const Column = styled.div`
    text-align: center;
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: inline-block;
    }
    li {
        padding-bottom: 10px;
        min-width: 200px;
        cursor: pointer;
        &:hover{
            font-weight: bold;
        }
    }
`

const Parent = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 100px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Footer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    color: white;
    text-align: center;
    p {
        font-size: 0.8rem;
    }
    a {
        color: lightblue;
        text-decoration: none;
    }
`

let currentClicked = "";

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
        produces: ["Food Rations"]
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
        produces: ["Advanced Electronics", "Claytronics", "Field Coils", "Shield Components", "Turret Components"]
    },

    {
        materialType: "tier2",
        materialName: "Scanning Arrays",
        producedBy: ["Refined Metals"],
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
        produces: ["Food Rations", "Medical Supplies", "Spacefuel"]
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
        producedBy: ["Microchips"],
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

const colorMap = {
    backward: {
        1: "yellow",
        2: "orange",
        3: "purple"
    },
    forward: {
        1: "blue",
        2: "green",
        3: "red"
    }
}

function camalize(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
        return chr.toUpperCase();
    });
}

const Main = () => {
    const [points, setPoints] = useState([]);
    const [lines, setLines] = useState([]);

    useEffect(() => {
        points.forEach(point => document.getElementById(point.name).style.fontWeight = "bold");
        points.forEach(point => document.getElementById(point.name).style.color = point.color);
    }, [points]);

    function mouseHandler(material) {
        function gatherForwardLines(current, distance) {
            let lines = [];
            let findCurrentMaterial = materialsData.find(({ materialName }) => materialName === current);
            if (!findCurrentMaterial || findCurrentMaterial.produces.length === 0) {
                return lines;
            }
            else {
                for (const produces of findCurrentMaterial.produces) {
                    lines.push({
                        from: camalize(current),
                        to: camalize(produces),
                        distance: distance,
                        color: colorMap.forward[distance]
                    })
                    lines.push(...gatherForwardLines(produces, distance + 1));
                }
            }
            return lines;
        }

        function gatherBackwardLines(current, distance) {
            let lines = [];
            let findCurrentMaterial = materialsData.find(({ materialName }) => materialName === current);
            if (!findCurrentMaterial || findCurrentMaterial.producedBy.length === 0) {
                return lines;
            }
            else {
                for (const producedBy of findCurrentMaterial.producedBy) {
                    lines.push({
                        from: camalize(producedBy),
                        to: camalize(current),
                        distance: distance,
                        color: colorMap.backward[distance]
                    })
                    lines.push(...gatherBackwardLines(producedBy, distance + 1));
                }
            }
            return lines;
        }

        function gatherForwardPoints(current, distance) {
            let points = [];
            let findCurrentMaterial = materialsData.find(({ materialName }) => materialName === current);
            if (!findCurrentMaterial || findCurrentMaterial.produces.length === 0) {
                return points;
            }
            else {
                for (const produces of findCurrentMaterial.produces) {
                    points.push({
                        name: camalize(produces),
                        color: colorMap.forward[distance]
                    });
                    points.push(...gatherForwardPoints(produces, distance + 1));
                }
            }
            return points;
        }

        function gatherBackwardsPoints(current, distance) {
            let points = [];
            let findCurrentMaterial = materialsData.find(({ materialName }) => materialName === current);
            if (!findCurrentMaterial || findCurrentMaterial.producedBy.length === 0) {
                return points;
            }
            else {
                for (const producedBy of findCurrentMaterial.producedBy) {
                    points.push({
                        name: camalize(producedBy),
                        color: colorMap.backward[distance]
                    });
                    points.push(...gatherBackwardsPoints(producedBy, distance + 1));
                }
            }
            return points;
        }

        if (currentClicked === "") {
            // Points logic to bold current selection and its chain
            if (points.length > 0) {
                points.forEach(point => document.getElementById(point.name).style.fontWeight = null);
                points.forEach(point => document.getElementById(point.name).style.color = "white");
                setPoints([]);
                setPoints(gatherForwardPoints(material, 1).concat(gatherBackwardsPoints(material, 1)));
            }
            else {
                setPoints(gatherForwardPoints(material, 1).concat(gatherBackwardsPoints(material, 1)));
            }

            // Lines logic to generate line for current selection and its chain
            if (lines.length > 0) {
                setLines([]);
                setLines(gatherForwardLines(material, 1).concat(gatherBackwardLines(material, 1)));
            }
            else {
                setLines(gatherForwardLines(material, 1).concat(gatherBackwardLines(material, 1)));
            }
        }
    }

    function clickHandler(material) {
        // If we reclicked on the same thing, deselect it
        if (currentClicked === material) {
            document.getElementById(camalize(material)).style.fontWeight = null;
            currentClicked = "";
        }

        // If we clicked on something new from not being clicked in, set it as our clicked
        else if (currentClicked === "") {
            document.getElementById(camalize(material)).style.fontWeight = "bold";
            currentClicked = material;
        }

        // If we clicked on something else while currently being clicked in
        else {
            document.getElementById(camalize(currentClicked)).style.fontWeight = null;
            document.getElementById(camalize(material)).style.fontWeight = "bold";
            currentClicked = "";
            mouseHandler(material);
            currentClicked = material;
            mouseHandler(material);
        }
    }

    return (
        <div>
            <Title>X4 Production Chart</Title>
            <Header>
                <Column><h1>Raw</h1></Column>
                <Column><h1>Tier 1</h1></Column>
                <Column><h1>Tier 2</h1></Column>
                <Column><h1>Tier 3</h1></Column>
            </Header>
            <hr />
            <Parent>
                <Column>
                    <ul id="raw">
                        {materialsData
                            .filter(material => material.materialType === "raw")
                            .map((material, index) => (
                                <li key={index} onClick={() => clickHandler(material.materialName)} onMouseOver={() => mouseHandler(material.materialName)} onMouseLeave={() => mouseHandler("")} id={camalize(material.materialName)}>{material.materialName}</li>
                            ))}
                    </ul>
                </Column>
                <Column>
                    <ul id="tier1">
                        {materialsData
                            .filter(material => material.materialType === "tier1")
                            .map((material, index) => (
                                <li key={index} onClick={() => clickHandler(material.materialName)} onMouseOver={() => mouseHandler(material.materialName)} onMouseLeave={() => mouseHandler("")} id={camalize(material.materialName)}>{material.materialName}</li>
                            ))}
                    </ul>
                </Column>
                <Column>
                    <ul id="tier2">
                        {materialsData
                            .filter(material => material.materialType === "tier2")
                            .map((material, index) => (
                                <li key={index} onClick={() => clickHandler(material.materialName)} onMouseOver={() => mouseHandler(material.materialName)} onMouseLeave={() => mouseHandler("")} id={camalize(material.materialName)}>{material.materialName}</li>
                            ))}
                    </ul>
                </Column>
                <Column>
                    <ul id="tier3">
                        {materialsData
                            .filter(material => material.materialType === "tier3")
                            .map((material, index) => (
                                <li key={index} onClick={() => clickHandler(material.materialName)} onMouseOver={() => mouseHandler(material.materialName)} onMouseLeave={() => mouseHandler("")} id={camalize(material.materialName)}>{material.materialName}</li>
                            ))}
                    </ul>
                </Column>
            </Parent>
            <div id="linesGenerated">
                {lines
                    .map((line, index) => (
                        <Xarrow key={index} start={line.from} end={line.to} color={line.color} strokeWidth={2} />
                    ))}
            </div>
            <Footer>
                <p>© Abraham Zakharov 2022. All rights reserved.</p>
                <p>Developed by <a href='https://abrahamzakharov.com' target="_blank" rel="noreferrer">Abraham Zakharov</a>. Concept by Alex Robles.</p>
                <p>This project was created as a tool to aid players in X4: Foundations by Egosoft. No official affiliation or endorsement by Egosoft is stated or implied.</p>
                <p><a href='https://www.paypal.com/donate/?business=W2L8DZCKXZPCY&no_recurring=0&currency_code=USD' target="_blank" rel="noreferrer">Buy me a coffee ❤️☕</a></p>
            </Footer>
        </div>
    );
};

export default Main;