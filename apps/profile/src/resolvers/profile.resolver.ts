import { randomUUID } from 'crypto';

interface Profile {
  name?: string;
  email?: string;
  avatar?: string;
  username?: string;
}

export class ProfileResolver {
  readonly id: string;
  name?: string;
  email?: string;
  avatar?: string;
  username?: string;

  constructor() {
    this.id = randomUUID();
    return this;
  }

  public setProfile(profile: Profile) {
    this.name = profile.name;
    this.email = profile.email;
    this.avatar = profile.avatar;
    this.username = profile.username;

    return this;
  }

  public getProfile() {
    return this;
  }
}
