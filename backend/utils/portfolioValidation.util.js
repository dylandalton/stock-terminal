export const validatePortfolio = async (portfolio, id) => {
    try {
      const userPf = await portfolio.findById(id).exec();
  
      if (!userPf) {
        throw {
          status: 404,
          message: 'Portfolio not found',
        };
      }
  
      return userPf;
    } catch (error) {
      throw error;
    }
  };

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