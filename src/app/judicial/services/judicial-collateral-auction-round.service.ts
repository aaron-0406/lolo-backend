import sequelize from "../../../libs/sequelize";
import { Op } from "sequelize";
import { JudicialCollateralAuctionRoundType } from "../types/judicial-collateral-auction-round.type";
import boom from '@hapi/boom';

const { models } = sequelize;

class JudicialCollateralAuctionRoundService {
  constructor() {}

  async findAllAuctionbyCollateralId(collateralId: number, chb: number, query: any) {
    let filtersWhere: any = {
      judicialCollateralIdJudicialCollateral: collateralId,
      customerHasBankId: chb,
    };
    try {
      const judicialCollateralAuctionRounds =
        await models.JUDICIAL_COLLATERAL_AUCTION_ROUND.findAll({
          where: filtersWhere,
          attributes:{
            exclude: ["judicialCollateralId"]
          }
        });
      if (!judicialCollateralAuctionRounds) {
        throw boom.notFound("No se encontraron rondas de remate");
      }
      return judicialCollateralAuctionRounds;
    } catch (error) {
      console.log(error);
    }
  }

  async findAllAuctionbyCaseFileId(caseFileId: number) {

    try {
      const rta = await models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.findAll({
        where: {
          judicialCaseFileId: caseFileId,
        },
        include: [
          {
            model: models.JUDICIAL_COLLATERAL,
            as: "judicialCollateral",
            where: {
              deletedAt: null,
            },
            include: [
              {
                model: models.JUDICIAL_COLLATERAL_AUCTION_ROUND,
                as: "judicialCollateralAuctionRound",
                where: {
                  deletedAt: null,
                },
                attributes: {
                  exclude: ["judicialCollateralId"]
                }
              }
            ]
          }
        ]
      });

      const judicialCollateralAuctionRounds = rta.flatMap((item) => item.dataValues.judicialCollateral.dataValues.judicialCollateralAuctionRound);
      if (!judicialCollateralAuctionRounds || judicialCollateralAuctionRounds.length === 0) {
        throw boom.notFound("No se encontraron rondas de remate");
      }
      return judicialCollateralAuctionRounds;
    } catch (error) {
      console.log(error);
    }
  }

  async getAuctionById(chb: number, collateralId: number, id: number) {
    try {
      const judicialCollateralAuctionRound =
        await models.JUDICIAL_COLLATERAL_AUCTION_ROUND.findOne({
          where: {
            id,
            customerHasBankId: chb,
            judicialCollateralIdJudicialCollateral: collateralId,
          },
          attributes: {
            exclude: ["judicialCollateralId"]
          }
        });
      if (!judicialCollateralAuctionRound)
        throw boom.notFound("Ronda de remate no encontrada");
      return judicialCollateralAuctionRound;
    }
    catch (error) {
      console.log(error);
    }
  }

  async create(data: JudicialCollateralAuctionRoundType) {
    try {
      const newJudicialCollateralAuctionRound =
        await models.JUDICIAL_COLLATERAL_AUCTION_ROUND.create(data);
      return newJudicialCollateralAuctionRound;
    } catch (error) {
      console.log(error);
    }
  }

  async update(chb: number, collateralId: number, id: number, data: JudicialCollateralAuctionRoundType) {
    try {
        const judicialCollateralAuctionRound =
          await models.JUDICIAL_COLLATERAL_AUCTION_ROUND.findOne({
            where: {
              id,
              customerHasBankId: chb,
              judicialCollateralIdJudicialCollateral: collateralId,
            },
            attributes: {
              exclude: ["judicialCollateralId"]
            }
          });

        if (!judicialCollateralAuctionRound) {
          throw boom.notFound("Ronda de remate no encontrada");
        }
        const oldData = {...judicialCollateralAuctionRound?.get()};
        const newData = await judicialCollateralAuctionRound.update(data);

      return { oldData, newData };
    } catch (error) {
      console.log(error);
    }
  }

  async delete(chb: number, collateralId: number, id: number) {
    try {
      const judicialCollateralAuctionRound =
        await models.JUDICIAL_COLLATERAL_AUCTION_ROUND.findOne({
          where: {
            id,
            customerHasBankId: chb,
            judicialCollateralIdJudicialCollateral: collateralId,
          },
          attributes: {
            exclude: ["judicialCollateralId"]
          }
        });
        const oldData = {...judicialCollateralAuctionRound?.get()};
      if (!judicialCollateralAuctionRound) throw boom.notFound("Ronda de remate no encontrada");
      await judicialCollateralAuctionRound.destroy();
      return oldData ;
    }
    catch (error) {
      console.log(error);
    }
  }
}


export default JudicialCollateralAuctionRoundService;