import { DataType } from "../types/DataType"

const data: DataType [] = [
    {
        label: "Home"
    },
    {
        label: "Services",
        children: [
            {
                label: "web design"
            },
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
                label: "SEO"
            }
        ]
    },
    {
        label: "About"
    }
]

export default data