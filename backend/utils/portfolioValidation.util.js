import Portfolio from '../models/portfolio.model.js';

export const validatePortfolio = async (Portfolio, id) => {
    try {
      const portfolio = await Portfolio.findById(id).exec();
  
      if (!portfolio) {
        throw {
          status: 404,
          message: 'Portfolio not found',
        };
      }
  
      return portfolio;
    } catch (error) {
      throw error;
    }
  };
  
// export const validateHolding = async (portfolio, holdingId) => {
//   try {
//     const holding = portfolio.holdings.id(holdingId);

//     if (!holding) {
//       throw {
//         status: 404,
//         message: 'Holding not found',
//       };
//     }

//     return holding;
//   } catch (error) {
//     throw error;
//   }
// };

export const validateHolding = async (portfolio, symbol) => {
  try {
    const holding = portfolio.holdings.find(holding => holding.symbol === symbol);

    if (!holding) {
      throw {
        status: 404,
        message: 'Holding not found',
      };
    }

    return holding;
  } catch (error) {
    throw error;
  }
};