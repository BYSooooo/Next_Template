"use client";

import React from "react";

import { Description, Label, Tabs, Text } from "@heroui/react";

interface TabType {
    key : string;
    title : string;

}

export default function MainTab() {
    
    const [tabItem, setTabItem] = React.useState<TabType[]>([])
    const [tabPanel, setTabPanel] = React.useState([]);

    // Fill Content using Database later
    React.useEffect(()=> {
        setTabItem([
            { key : "1", title : "Food/Deli" },
            { key : "2", title : "Household" },
            { key : "3", title : "Furniture" }
        ])
        setTabPanel([
            { title : "Food/Deli" , content : "Food Content"},
            { title : "Household", content : "Household Content"},
            { title : "Furniture", content : "Furniture Content"}
        ])
    },[])

    return (
        <div className="w-full">
            <div className="flex flex-col mx-auto max-w-7xl px-6">
                <Label className="font-bold text-2xl">
                    New Products
                </Label>
                <Description className="text-lg">
                    Check out our new offers!
                </Description>
                <Tabs>
                    <Tabs.ListContainer>
                        <Tabs.List aria-label="Menu">
                            {tabItem.map((tab)=> {
                                return (
                                    <Tabs.Tab id={tab.title} key={tab.key}>
                                        {tab.title}
                                    </Tabs.Tab>
                                )
                            })}
                        </Tabs.List>
                            {tabPanel.map((panel)=> {
                                return (
                                    <Tabs.Panel key={panel.title} id={panel.title}>
                                        {panel.content}
                                    </Tabs.Panel>
                                )
                            })}
                    </Tabs.ListContainer>
                </Tabs>
            </div>
        </div>
    )
}