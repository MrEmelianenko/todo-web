export class IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export class User {
  private _id: number;
  private _first_name: string;
  private _last_name: string;
  private _email: string;

  constructor(user: IUser) {
    this._id = user.id;
    this._first_name = user.first_name;
    this._last_name = user.last_name;
    this._email = user.email;
  }

  public get id()             { return this._id;          }
  public set id(value)        { this._id = value;         }

  public get firstName()      { return this._first_name;  }
  public set firstName(value) { this._first_name = value; }

  public get lastName()       { return this._last_name;   }
  public set lastName(value)  { this._last_name = value;  }

  public get email()          { return this._email;       }
  public set email(value)     { this._email = value;      }

  getFullName()  { return this.firstName + " " + this.lastName }
}
