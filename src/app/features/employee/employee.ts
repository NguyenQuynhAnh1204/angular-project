export interface IEmployee {
    id: number;
    name: string;
    age: number;
    avatar?: string;
}

export const employees: IEmployee[] = [
  { "id": 1, "name": "Nguyen Van An", "age": 25, avatar: 'assets/img/avatarView.jpg' },
  { "id": 2, "name": "Tran Thi Mai", "age": 28 },
  { "id": 3, "name": "Le Minh Hoang", "age": 32 },
  { "id": 4, "name": "Pham Thu Trang", "age": 26 },
  { "id": 5, "name": "Vu Duc Long", "age": 35 },
  { "id": 6, "name": "Dang Hai Yen", "age": 24 },
  { "id": 7, "name": "Bui Quang Huy", "age": 30 },
  { "id": 8, "name": "Hoang Thi Lan", "age": 27 },
  { "id": 9, "name": "Ngo Thanh Tung", "age": 33 },
  { "id": 10, "name": "Do Khanh Linh", "age": 22 }
]
