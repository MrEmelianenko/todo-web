export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export class User {
  constructor(
    user: IUser,
    private _id = user.id,
    private _first_name = user.first_name,
    private _last_name = user.last_name,
    private _email = user.email
  ) {}

  isUpdating = false;

  get id()                 { return this._id;          }
  set id(value)            { this._id = value;         }

  get firstName()          { return this._first_name;  }
  set firstName(value)     { this._first_name = value; }

  get lastName()           { return this._last_name;   }
  set lastName(value)      { this._last_name = value;  }

  get email()              { return this._email;       }
  set email(value)         { this._email = value;      }

  getFullName()  { return this.firstName + " " + this.lastName }

  raw() {
    return {
      id:         this.id,
      first_name: this.firstName,
      last_name:  this.lastName,
      email:      this.email
    }
  }

  serialize() {
    return JSON.stringify(this.raw());
  }

  static deserialize(data: string) {
    return new User(JSON.parse(data));
  }
}
