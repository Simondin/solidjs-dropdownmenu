import { DataType } from "../types/DataType"

const data: DataType [] = [
    {
        label: "Home"
    },
    {
        label: "Services",
        children: [
            {
                label: "web development",
                children: [
                    {
                        label: "Frontend",
                        children: [
                            {
                                label: "React",
                            },
                            {
                                label: "Vue",
                            },
                        ],
                    },
                    {
                        label: "Backend",
                        children: [
                            {
                                label: "NodeJS",
                            },
                            {
                                label: "PHP",
                            },
                        ],
                    },
                ],
            },
            {
                label: "web design",
                children: [
                    {
                        label: "Figma",

                    }
                ]
            },
            {
                label: "SEO",
            }
        ]
    },
    {
        label: "About",
        disabled: true,
    }
]

export default data