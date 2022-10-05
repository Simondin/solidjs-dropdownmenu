import { DataType } from "../types/DataType"

const data: DataType [] = [
    {
        label: "Home"
    },
    {
        label: "Services",
        children: [
            {
                label: "web design",
                children: [
                    {
                        label: "Figma",

                    }
                ]
            },
            {
                label: "web development",
                children: [
                    {
                        label: "Frontend",
                        children: [
                            {
                                label: "Reactasdasda sdas dasd as da sd as d asd ",
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
                label: "SEO",
                disabled: true,
            }
        ]
    },
    {
        label: "About"
    }
]

export default data