
import { EControlType, ETypeValidation } from "src/app/lib/bravo-control-base";
import { EGridSizeType, ITablePanel } from "src/app/lib/bravo-panel/bravo-panel.type";



// config layout table panel
export const PANEL_CONFIG: ITablePanel[] = [ 
    //layout 1
    {
        rows: [
            {index: 1, value: '100px', size: EGridSizeType.ABSOLUTE},
            {index: 2, value: 'auto', size: EGridSizeType.AUTOSIZE},
            {index: 3, value: '2fr', size: EGridSizeType.PERCENT},
            {index: 4, value: '1fr', size: EGridSizeType.PERCENT},
            {index: 5, value: '1fr', size: EGridSizeType.PERCENT},
        ],
        columns: [
            {index: 1, value: '50%', size: EGridSizeType.ABSOLUTE},
            {index: 2, value: '1fr', size: EGridSizeType.PERCENT},
        ],
        controls: [
            {
                control: {
                    row: 1,
                    column: 1,
                    label: "Thời gian và tiền tệ"
                },
                child: {
                    columns: [
                        {index: 1, value: 'auto'},
                        {index: 2, value: 'auto'},
                        {index: 3, value: 'auto'},
                        {index: 4, value: 'auto'}
                    ],
                    rows: [
                        {index: 1, value: 'auto'}
                    ],
                    controls: [
                        {
                            control: {
                                column: 4,
                                row: 1,
                                label: "Ngày",
                                name: "ngay",
                                type: EControlType.DATE,
                                validator:{type: ETypeValidation.REQUIRED, message: "Field is required"},
                            }
                        }, 
                        {
                            control: {
                                column: 2,
                                row: 1,
                                label: "Số",
                                type: EControlType.NUMBER,
                                name: "so",
                                validator: [
                                    {type: ETypeValidation.REQUIRED, message: "Field is required"},
                                    {type: ETypeValidation.NUMBER, message: "Input is not number"}
                                ]
                            }
                        },
                        {
                            control: {
                                column: 3,
                                row: 1,
                                label: "Tiền tệ",
                                type: EControlType.NUMBER,
                                name: "tienTe",
                                validator: [
                                    {type: ETypeValidation.REQUIRED, message: "Field is required"},
                                    {type: ETypeValidation.NUMBER, message: "Input is not number"}
                                ]
                            }
                        },
                        {
                            control: {
                                column: 1,
                                row: 1,
                                label: "Tỉ giá",
                                type: EControlType.NUMBER,
                                name: "tiGia",
                                validator: [
                                    {type: ETypeValidation.REQUIRED, message: "Field is required"},
                                    {type: ETypeValidation.NUMBER, message: "Input is not number"}
                                ]
                            }
                        }
                    ]
                }
            },
            {
                control: {
                    row: 1,
                    column: 2,
                    label: "Báo giá",
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
                                type: EControlType.TEXTBOX,
                                name: "loaiYeuCau",
                                validator: [
                                    {type: ETypeValidation.REQUIRED, message: "Field is required"},
                                ]
                            }
                        }, 
                        {
                            control: {
                                column: 2,
                                row: 1,
                                label: "Yêu cầu báo giá",
                                type: EControlType.TEXTBOX,
                                name: "yeuCauBaoGia",
                                validator: [
                                    {type: ETypeValidation.REQUIRED, message: "Field is required"},
                                    {type: ETypeValidation.NUMBER, message: "Input is not number"}
                                ]
                            }
                        }
                    ]
                } 
            },
            {
                control: {
                    column: 1,
                    row: 2,
                    label: "",
                    type: EControlType.DATE_RANGE,
                    name: "date"
                }
            },
            {
                control: {
                    column: 2,
                    row: 2,
                    label: 'Month',
                    type: EControlType.MONTH,
                }
            }
        ]
    },
    //layout 2
    {
        rows: [
            {index: 1, value: '80px', size: EGridSizeType.ABSOLUTE},
            {index: 2, value: '80px', size: EGridSizeType.ABSOLUTE},
            {index: 3, value: '80px', size: EGridSizeType.ABSOLUTE},
            {index: 4, value: '80px', size: EGridSizeType.ABSOLUTE},
            {index: 5, value: '80px', size: EGridSizeType.ABSOLUTE},
        ],
        columns: [
            {index: 1, value: '800px', size: EGridSizeType.ABSOLUTE},
            {index: 2, value: '1fr', size: EGridSizeType.PERCENT},
        ],
        controls: [
            {
                control: {
                    row: 1,
                    column: 1,
                    label: "",
                    style: {
                        color: "#ca660e",
                    }
                },
                child: {
                    columns: [
                        {index: 1, value: '1fr', size: EGridSizeType.PERCENT},
                        {index: 2, value: '1fr', size: EGridSizeType.PERCENT},
                        {index: 3, value: '2fr', size: EGridSizeType.PERCENT},
                        {index: 4, value: '2fr', size: EGridSizeType.PERCENT}
                    ],
                    rows: [
                        {index: 1, value: 'auto'}
                    ],
                    controls: [
                        {
                            control: {
                                column: 1,
                                row: 1,
                                label: "Ngày",
                                type: EControlType.DATE,
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
                                label: "Chọn lịch",
                                type: EControlType.DATE_RANGE
                            }
                        },{
                            control: {
                                column: 4,
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
                    label: "" ,
                    style: {
                        color: "#1fa00c",
                    }
                },
                child: {
                    rows: [{index: 1, value: 'auto'}],
                    columns: [{index: 1, value: 'auto'}, {index: 2, value: 'auto'}],
                    controls: [
                        {
                            control: {
                                column: 1,
                                row: 1,
                                label: "Loại yêu cầu"
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
            }, 
            {
                control: {
                    row: 2,
                    column: 1,
                    label: "Địa chỉ",
                    style: {
                        color: "#ca660e",
                    }
                }
            }, 
            {
                control: {
                    row: 2,
                    column: 2,
                    label: "",
                    style: {
                        color: "#1fa00c",
                    }
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
            }, 
            {
                control: {
                    row: 3,
                    column:1,
                    label: "Người đại diện",
                    style: {
                        color: '#ca660e'
                    }
                }
            }, 
            {
                control: {
                    row: 3,
                    column: 2,
                    label: "Diễn giả",
                    style: {
                        color: "#1fa00c",
                    }
                }
            },
            {
                control: {
                    row: 4,
                    column:1,
                    columnsSpan: 2,
                    label: "Chính sách chiết khấu",
                    style: {
                        color: "#ca660e"
                    }
                }
            }, 
            {
                control: {
                    row: 5,
                    column:1,
                    columnsSpan: 2,
                    label: "Điều khoản thương mại",
                    style: {
                        color: "#ca660e",
                    }
                }
            }
        ]
    },
]
