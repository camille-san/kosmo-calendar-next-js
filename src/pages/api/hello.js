import prisma from "../../../lib/prisma";

export default async function handler(req, res) {

    await prisma.messages
        .findFirst({
            where: {
                id: 1,
            }
        })
        .then((data) => {
            res.status(200).json({msg: data.content});
        })
        .catch((err) => {
            console.log("ERROR:" + err)
        });
};