import { IConfigLayOut } from "src/app/lib";


export const CONFIG_LAYOUT: IConfigLayOut[]  = [
    {
        column: 1,
        row: 1, 
        label: "",
        style: {
            width: "",
            padding: "10 0",
            margin: "10 0"
        },
        child: [
            {
                column: 1,
                row: 1, 
                label: "Ngày",
                style: {}
            },
            {
                column: 2,
                row: 1, 
                label: "Số",
                style: {}
            },
            {
                column: 3,
                row: 1, 
                label: "Tiền tệ",
                style: {}
            },
            {
                column: 4,
                row: 1, 
                label: "Tỷ giá",
                style: {}
            }
        ]
    },
    {
        column: 2,
        row: 1, 
        label: "",
        style: {
            width: "",
            padding: "10 0",
            margin: "10 0"
        },
        child: [
            {
                column: 1,
                row: 1, 
                label: "Loại yêu cầu",
                style: {}
            },
            {
                column: 2,
                row: 1, 
                label: "Yêu cầu báo giá",
                style: {}
            }
        ]
    },
    {
        column: 1,
        row: 2, 
        label: "Địa chỉ",
        style: {
            width: "",
            padding: "10 0",
            margin: "10 0"
        }
    },
    {
        column: 2,
        row: 2, 
        label: "",
        style: {
            width: "",
            padding: "10 0",
            margin: "10 0"
        },
        child: [
            {
                column: 1,
                row: 1, 
                label: "Hiệu lực đến",
                style: {}
            },
            {
                column: 2,
                row: 1, 
                label: "Lần báo giá",
                style: {}
            }
        ]
    },
    {
        column: 1,
        row: 3, 
        label: "Người đại diện",
        style: {
            width: "",
            padding: "10 0",
            margin: "10 0"
        }
    },
    {
        column: 2,
        row: 3, 
        label: "Diễn giải",
        style: {
            width: "",
            padding: "10 0",
            margin: "10 0"
        }
    },
    {
        column: 1,
        row: 4, 
        label: "Chính sách chiết khấu",
        style: {
            width: "",
            padding: "10 0",
            margin: "10 0"
        }
    },
    {
        column: 1,
        row: 5, 
        label: "Điều khoản thương mại",
        style: {
            width: "",
            padding: "10 0",
            margin: "10 0"
        }
    }
]