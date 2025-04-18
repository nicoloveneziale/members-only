const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function createUser(username, password, firstname, lastname) {
  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function findUserFromUsername(username) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getUser(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateMember(id) {
  try {
    const updateMember = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        membership_status: true,
      },
    });
    return updateMember;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function createMessage(title, date, text, userId) {
  try {
    const createMessage = await prisma.message.create({
      data: {
        title: title,
        date: date,
        text: text,
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return createMessage;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getAllMessages(sortBy) {
  try {
    let orderByClause = {};

    if (sortBy === "new") {
      orderByClause = { date: "desc" };
    } else if (sortBy === "most liked") {
      orderByClause = {
        likedBy: {
          _count: "desc",
        },
      };
    } else if (sortBy === "hot") {
      orderByClause = {
        likedBy: {
          _count: "desc",
        },
      };
    }

    const messages = await prisma.message.findMany({
      include: {
        users: {
          select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
            membership_status: true,
            admin: true,
          },
        },
        _count: {
          select: {
            likedBy: true,
          },
        },
      },
      orderBy: orderByClause,
    });
    return messages;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function likeMessage(messageId, userId) {
  const existing = await prisma.messageLike.findUnique({
    where: {
      userId_messageId: { userId, messageId },
    },
  });

  if (existing) {
    await prisma.messageLike.delete({
      where: {
        userId_messageId: { userId, messageId },
      },
    });
  } else {
    await prisma.messageLike.create({
      data: {
        userId: userId,
        messageId: messageId,
      },
    });
  }
}

async function getMessageLike(messageId, userId) {
  const messageLike = await prisma.messageLike.findUnique({
    where: {
      userId_messageId: { userId, messageId },
    },
  });
  return messageLike;
}

module.exports = {
  createUser,
  findUserFromUsername,
  getUser,
  updateMember,
  createMessage,
  getAllMessages,
  likeMessage,
  getMessageLike,
};
