//
// Copyright (c) Microsoft.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
//

import { GitHubRepositoryPermission, IGitHubCollaboratorPermissions } from '../interfaces';
import { projectCollaboratorPermissionsObjectToGitHubRepositoryPermission } from '../transitional';
import * as common from './common';

// prettier-ignore
const memberPrimaryProperties = [
  'id',
  'login',
  'permissions',
  'avatar_url',
];

export type CollaboratorJson = {
  avatar_url: string;
  id: number;
  login: string;
  permissions: IGitHubCollaboratorPermissions;
};

export type CollaboratorAccount = Collaborator | { id: number; login: string };

export function compareCollaborators(a: Collaborator, b: Collaborator) {
  return a?.login.localeCompare(b?.login, 'en', { sensitivity: 'base' });
}

export class Collaborator {
  public static PrimaryProperties = memberPrimaryProperties;

  private _avatar_url: string;
  private _id: number;
  private _login: string;
  private _permissions: IGitHubCollaboratorPermissions;

  constructor(entity: unknown) {
    if (entity) {
      common.assignKnownFieldsPrefixed(this, entity, 'member', memberPrimaryProperties);
    }
  }

  asJson(): CollaboratorJson {
    return {
      avatar_url: this.avatar_url,
      id: this._id,
      login: this._login,
      permissions: this._permissions,
    };
  }

  get permissions(): IGitHubCollaboratorPermissions {
    return this._permissions;
  }

  getHighestPermission() {
    if (!this._permissions) {
      return GitHubRepositoryPermission.None;
    }
    return projectCollaboratorPermissionsObjectToGitHubRepositoryPermission(this._permissions);
  }

  get id(): number {
    return this._id;
  }

  get login(): string {
    return this._login;
  }

  get avatar_url(): string {
    return this._avatar_url;
  }
}
