const createBody = {
  userName: {
    notEmpty: {
      errorMessage: "userName cannot be empty",
    },
    isLength: {
      options: { min: 5, max: 12 },
      errorMessage: "userName must be between 5 and 12 characters",
    },
    isString: {
      errorMessage: "userName must be be a string",
    },
    escape: true,
  },

  displayName: {
    notEmpty: {
      errorMessage: "displayName cannot be empty",
    },
    isString: {
      errorMessage: "displayName must be a string",
    },
    escape: true,
  },
};

const putBody = {
  userName: {
    notEmpty: {
      errorMessage: "userName cannot be empty",
    },
    isLength: {
      options: { min: 5, max: 12 },
      errorMessage: "userName must be between 5 and 12 characters",
    },
    isString: {
      errorMessage: "userName must be a string",
    },
    escape: true,
  },
  displayName: {
    notEmpty: {
      errorMessage: "userName cannot be empty",
    },
    isString: {
      errorMessage: "displayName must be a string",
    },
    escape: true,
  },
};

const patchBody = {
  userName: {
    optional: true,
    isLength: {
      options: { min: 5, max: 12 },
      errorMessage: "userName must be between 5 and 12 characters",
    },
    isString: {
      errorMessage: "userName must be a string",
    },
    escape: true,
  },
  displayName: {
    optional: true,
    isString: {
      errorMessage: "displayName must be a string",
    },
    escape: true,
  },
};

const putParams = {
  id: {
    escape: true,
    custom: {
      options: (value: string) => value.startsWith("rec"),
      errorMessage: "id must be a valid string",
    },
  },
};

const patchParams = {
  id: {
    escape: true,
    custom: {
      options: (value: string) => value.startsWith("rec"),
      errorMessage: "id must be a valid string",
    },
  },
};

const deleteParams = {
  id: {
    escape: true,
    custom: {
      options: (value: string) => value.startsWith("rec"),
      errorMessage: "id must be a valid string",
    },
  },
};

export default {
  create: {
    body: createBody,
  },
  put: {
    body: putBody,
    params: putParams,
  },
  patch: {
    body: patchBody,
    params: patchParams,
  },
  delete: {
    params: deleteParams,
  },
};
