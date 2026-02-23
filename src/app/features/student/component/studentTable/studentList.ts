export interface IStudent {
    id: string,
    name: string,
    birthday: Date,
    score: number
}


export const studentList: IStudent[] = [
  {
    id: "SV001",
    name: "Nguyễn Văn An",
    birthday: new Date(2008,3,15),
    score: 8.5
  },
  {
    id: "SV002",
    name: "Trần Thị Bích",
    birthday: new Date(2008,7,21),
    score: 7.8
  },
  {
    id: "SV003",
    name: "Lê Minh Châu",
    birthday: new Date(2009,1,10),
    score: 9.2
  },
  {
    id: "SV004",
    name: "Phạm Quốc Dũng",
    birthday: new Date(2008,11,5),
    score: 6.4
  },
  {
    id: "SV005",
    name: "Hoàng Thu Hà",
    birthday: new Date(2009,4,18),
    score: 8.9
  },
  {
    id: "SV006",
    name: "Đỗ Trung Kiên",
    birthday: new Date(2008,9,12),
    score: 7.1
  },
  {
    id: "SV007",
    name: "Vũ Ngọc Lan",
    birthday: new Date(2009,2,25),
    score: 9.5
  },
  {
    id: "SV008",
    name: "Bùi Đức Minh",
    birthday: new Date(2008,6,30),
    score: 6.9
  },
  {
    id: "SV009",
    name: "Nguyễn Thị Oanh",
    birthday: new Date(2009,8,14),
    score: 4.1
  },
  {
    id: "SV010",
    name: "Trịnh Văn Phúc",
    birthday: new Date(2008,12,3),
    score: 8.0
  }
]
