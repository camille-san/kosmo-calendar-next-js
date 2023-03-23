import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
    const year = parseInt(req.query.year);
    let months = [];

    try {
        for (let i = 0; i <= 11; i++) {
            let month = {
                month: i,
                days: []
            };
            const dateStart = new Date(year, i, 1);
            let dateEnd = new Date(year, (i + 1), 1);
            if (i === 12) {
                dateEnd = new Date((year + 1), 1, 1);
            }

            await prisma.day.findMany({
                where: {
                    date: {
                        lte: dateEnd,
                        gt: dateStart,
                    }
                }
            }).then((data) => {
                    month.days = data;
                    months.push(month);
                }
            );
        }

        res.status(200).json(months);
    } catch
        (error) {
        res.status(500).json({error: error.message});
    }
};
