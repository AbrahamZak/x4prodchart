import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Xarrow from "react-xarrows";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import materialsData from "../data/materialsData.json"

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
`
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

    @media only screen and (max-width: 600px) {
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: inline-block;
    }
    li {
        padding-bottom: 10px;
        min-width: 75px;
        font-size: 0.6rem;
        cursor: pointer;
        &:hover{
            font-weight: bold;
        }
    }
}
`

const Parent = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 100px;
    @media only screen and (max-width: 600px) {
        padding-top: 30px;
    }
`

const Header = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Footer = styled.div`
    margin-top: auto;
    text-align: center;
    p {
        color: white;
        font-size: 0.8rem;
    }
    a {
        color: lightblue;
        text-decoration: none;
    }
    @media only screen and (max-width: 600px) {
        
        p {
            font-size: 0.5rem;
        }
    }
`

const firebaseConfig = {
    apiKey: "AIzaSyCCOTx3MjpvZEGKeei5uIXf-dCvwuwTaGU",
    authDomain: "x4prodchart.firebaseapp.com",
    projectId: "x4prodchart",
    storageBucket: "x4prodchart.appspot.com",
    messagingSenderId: "539389007677",
    appId: "1:539389007677:web:61f198768847220f279754",
    measurementId: "G-6HS7GYBVN4"
};

// Initialize Firebase
/* eslint-disable no-unused-vars */
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
/* eslint-enable no-unused-vars */

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
    const currentClicked = useRef("");

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

        if (currentClicked.current === "") {
            // Points logic to bold current selection and its chain
            if (points.length > 0) {
                points.forEach(point => document.getElementById(point.name).style.fontWeight = null);
                points.forEach(point => document.getElementById(point.name).style.color = "white");
                setPoints(gatherForwardPoints(material, 1).concat(gatherBackwardsPoints(material, 1)));
            }
            else {
                setPoints(gatherForwardPoints(material, 1).concat(gatherBackwardsPoints(material, 1)));
            }

            // Lines logic to generate line for current selection and its chain
            if (lines.length > 0) {
                setLines(gatherForwardLines(material, 1).concat(gatherBackwardLines(material, 1)));
            }
            else {
                setLines(gatherForwardLines(material, 1).concat(gatherBackwardLines(material, 1)));
            }
        }
    }

    function clickHandler(material) {
        // If we reclicked on the same thing, deselect it
        if (currentClicked.current === material) {
            document.getElementById(camalize(material)).style.fontWeight = null;
            currentClicked.current = "";
        }

        // If we clicked on something new from not being clicked in, set it as our clicked
        else if (currentClicked.current === "") {
            document.getElementById(camalize(material)).style.fontWeight = "bold";
            currentClicked.current = material;
        }

        // If we clicked on something else while currently being clicked in
        else {
            document.getElementById(camalize(currentClicked.current)).style.fontWeight = null;
            document.getElementById(camalize(material)).style.fontWeight = "bold";
            currentClicked.current = "";
            mouseHandler(material);
            currentClicked.current = material;
            mouseHandler(material);
        }
    }

    function optionHandler() {
        //If something is currently selected, update our points and lines
        if (currentClicked.current !== "") {
            const selected = currentClicked.current;
            currentClicked.current = "";
            mouseHandler(selected);
            currentClicked.current = selected;
        }
    }

    return (
        <Container>
            <Title>X4 Production Chart</Title>
            <Header>
                <Column><h1>Raw</h1></Column>
                <Column><h1>Tier 1</h1></Column>
                <Column><h1>Tier 2</h1></Column>
                <Column><h1>Tier 3</h1></Column>
            </Header>
            <hr/>
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
                                <div key={index}>
                                {material.producedByOptions?.map((option, radioIndex) => (
                                    <input key={radioIndex} type="radio" name={material.materialName} value={option.producedBy} defaultChecked={option.faction === "Universal"} onChange={()=> { material.producedBy = option.producedBy; optionHandler(material.materialName) }}/> 
                                ))}
                                <li onClick={() => clickHandler(material.materialName)} onMouseOver={() => mouseHandler(material.materialName)} onMouseLeave={() => mouseHandler("")} id={camalize(material.materialName)}>{material.materialName}</li>
                                </div>
                            ))}
                    </ul>
                </Column>
                <Column>
                    <ul id="tier3">
                        {materialsData
                            .filter(material => material.materialType === "tier3")
                            .map((material, index) => (
                                <div key={index}>
                                {material.producedByOptions?.map((option, radioIndex) => (
                                    <input key={radioIndex} type="radio" name={material.materialName} value={option.producedBy} defaultChecked={option.faction === "Universal"} onChange={()=> { material.producedBy = option.producedBy; optionHandler(material.materialName) }}/> 
                                ))}
                                <li onClick={() => clickHandler(material.materialName)} onMouseOver={() => mouseHandler(material.materialName)} onMouseLeave={() => mouseHandler("")} id={camalize(material.materialName)}>{material.materialName}</li>
                                </div>
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
        </Container>
    );
};

export default Main;