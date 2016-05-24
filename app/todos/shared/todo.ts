import { User, IUser } from '../../users/shared/user';

export interface ITodo {
  id: number;
  user: IUser;
  text: string;
  done: boolean;
}

export class Todo {
  constructor(
    todo: ITodo,
    private _id = todo.id,
    private _user = new User(todo.user),
    private _text = todo.text,
    private _done = todo.done
  ) {}

  public isUpdating = false;

  public get id()         { return this._id;    }
  public set id(value)    { this._id = value;   }

  public get user()       { return this._user;  }
  public set user(value)  { this._user = value; }

  public get text()       { return this._text;  }
  public set text(value)  { this._text = value; }

  public get done()       { return this._done;  }
  public set done(value)  { this._done = value; }

  raw() {
    return {
      id: this.id,
      user_id: this.user.id,
      text: this.text,
      done: this.done
    }
  }
}