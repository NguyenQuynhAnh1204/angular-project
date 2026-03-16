import { EGridSizeType, ITablePanel } from "src/app/lib/bravo-panel/bravo-panel.type";


export const PANEL_CONFIG: ITablePanel = {
    rows: [
        {index: 1, value: '100px', size: EGridSizeType.ABSOLUTE},
        {index: 2, value: '2fr', size: EGridSizeType.PERCENT},
        {index: 3, value: '1fr', size: EGridSizeType.PERCENT},
    ],
    columns: [
        {index: 1, value: '50%', size: EGridSizeType.ABSOLUTE},
        {index: 2, value: '1fr', size: EGridSizeType.PERCENT},
    ],
    controls: [
        {
            control: {
                row: 2,
                column: 1,
                label: ""
            },
            child: {
                columns: [
                    {index: 1, value: '50px', size: EGridSizeType.ABSOLUTE},
                    {index: 2, value: 'auto'},
                    {index: 3, value: '1fr', size: EGridSizeType.PERCENT},
                    {index: 4, value: '4fr', size: EGridSizeType.PERCENT}
                ],
                rows: [
                    {index: 1, value: 'auto'}
                ],
                controls: [
                    {
                        control: {
                            column: 4,
                            row: 1,
                            label: "Ngày"
                        }
                    }, {
                        control: {
                            column: 2,
                            row: 1,
                            label: "Số"
                        }
                    },{
                        control: {
                            column: 3,
                            row: 1,
                            label: "Tiền tệ"
                        }
                    },{
                        control: {
                            column: 1,
                            row: 1,
                            label: "Tỉ giá"
                        }
                    }
                ]
            }
        },
        {
            control: {
                row: 1,
                column: 2,
                label: "",
            },
            child: {
                rows: [{index: 1, value: 'auto'}],
                columns: [{index: 1, value: 'auto'}, {index: 2, value: 'auto'}],
                controls: [
                    {
                        control: {
                            column: 1,
                            row: 1,
                            label: "Loại yêu cầu",
                        }
                    }, {
                        control: {
                            column: 2,
                            row: 1,
                            label: "Yêu cầu báo giá",
                        }
                    }
                ]
            } 
        }, {
            control: {
                row: 1,
                column: 1,
                label: "Địa chỉ"
            }
        }, {
            control: {
                row: 2,
                column: 2,
                label: "",
            },
            child: {
                rows: [{index: 1, value: 'auto'}],
                columns: [{index: 1, value: 'auto'}, {index: 2, value: 'auto'}],
                controls: [
                    {control: {
                        column: 1,
                        row: 1,
                        label: "Hiệu lực đến"
                    }}, {control: {
                        column: 2,
                        row: 1,
                        label: "Lần báo giá"
                    }}
                ]
            }
        }, {
            control: {
                row: 3,
                column:1,
                label: "Người đại diện",
            }
        }, {
            control: {
                row: 3,
                column: 2,
                label: "Diễn giả"
            }
        }
    ]
}