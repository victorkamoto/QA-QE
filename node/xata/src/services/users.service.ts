import { xata } from "../server";
import { User } from "../types/users.types";
import { NotFoundErr } from "../utils/errors.util";

const findAll = async () => {
  try {
    const records = await xata.db.users.getMany();
    return records;
  } catch (err) {
    throw err;
  }
};

const findOne = async ({ id }: Pick<User, "id">) => {
  try {
    const record = await xata.db.users.read(id);
    return record;
  } catch (err) {
    throw err;
  }
};

const create = async ({ userName, displayName }: Omit<User, "id">) => {
  try {
    const record = await xata.db.users.create({
      userName,
      displayName,
    });
    return record;
  } catch (err) {
    throw err;
  }
};

const put = async ({ id, userName, displayName }: User) => {
  try {
    const exists = await xata.db.users.read(id);

    if (!exists) {
      throw new NotFoundErr();
    } else {
      const record = await xata.db.users.createOrReplace(id, {
        userName,
        displayName,
      });
      return record;
    }
  } catch (err) {
    throw err;
  }
};

const patch = async ({ id, userName, displayName }: User) => {
  try {
    const exists = await xata.db.users.read(id);

    if (!exists) {
      throw new NotFoundErr();
    } else {
      const record = await exists.update(
        {
          userName,
          displayName,
        },
        {
          ifVersion: exists.xata_version,
        },
      );
      return record;
    }
  } catch (err) {
    throw err;
  }
};

const remove = async ({ id }: Pick<User, "id">) => {
  try {
    const record = await xata.db.users.delete(id);

    if (!record) {
      throw new NotFoundErr();
    }

    return record;
  } catch (err) {
    throw err;
  }
};

export default { create, findAll, findOne, put, patch, remove };
