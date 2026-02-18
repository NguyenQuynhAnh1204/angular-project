/**
 * 1. Kiến thức mình biết.
 * 2. Kiến thức mình biết là đéo biết. // có thời gian sẽ học
 * 3. Kiến thức mình đéo biết là mình đéo biết.// giảm được cái vùng này đi (có chỉ dẫn, tham gia vào cộng đồng, đọc nhiều)
 */

//type type
//1.interface
interface IPerson {
  name: string;
  age: number;
  characters: ICharacter;
  speak?: () => void;
}

interface ICharacter {
  isKind: boolean;
  isBad: boolean;
}

interface IParent extends IPerson {
  children: IChild[];
}

interface IChild extends IPerson {
  parent: IParent;
}

// type
//union type
type Something = string | number | IPerson;
type BrAny = any;

//
const person: IPerson = {
  // object literal
  name: 'nobody',
  age: 33,
  characters: {
    isBad: true,
    isKind: false,
  },
};
type PropsPersonType = keyof Something;
function getPropsPerson(pNameProp: PropsPersonType) {
  return person[pNameProp] ?? null;
}

//enum
enum Color {
  Red,
  Yellow,
  Pink,
}
type ColorKey = keyof typeof Color;

enum Direction {
  Left = 1,
  Right = 2,
  Both = 3,
}

const directive = Direction.Both;

function isLeft(pDirection: Direction) {
  if ((pDirection & Direction.Left) !== 0) return true;
  return false;
}

function isRight(pDirection: Direction) {
  if ((pDirection & Direction.Right) !== 0) return true;
  return false;
}

// utility types
interface IUser extends IPerson {}

function fetchUsers() {
  const users = [person];
  return new Promise<IUser[]>((pResolve, pReject) =>
    setTimeout(() => {
      pResolve(users);
    }, 5000),
  );
}

type ResultLoadUserType = Awaited<ReturnType<typeof fetchUsers>>;

//2. Partial type
function updatePerson(pPerson: Partial<IPerson>) {
  for (const pKey in pPerson) {
    const key = pKey as keyof IPerson;
    (person as BrAny)[key] = pPerson[key];
  }
}
updatePerson({ name: 'Anyone' });

// literal object vs class

//Record<Keys, Type>

const somthing: Record<string, Partial<IParent>> = {
  Pink: { name: 'Somebody' },
};
