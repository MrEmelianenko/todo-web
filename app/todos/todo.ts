import { User, IUser } from '../users/user';

export interface ITodo {
  id: number;
  user: IUser;
  text: string;
}

export class Todo {
  private _id: number;
  private _user: User;
  private _text: string;

  constructor(todo: ITodo) {
    this._id   = todo.id;
    this._user = new User(todo.user);
    this._text = todo.text;
  }

  public get id()         { return this._id;    }
  public set id(value)    { this._id = value;   }

  public get user()       { return this._user;  }
  public set user(value)  { this._user = value; }

  public get text()       { return this._text;  }
  public set text(value)  { this._text = value; }
}