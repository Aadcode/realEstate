const monthOrder = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  export function generateInsightsFromPropertyData(data) {
    const revenueByMonth= {};
    let totalRevenue = 0;
    let totalRent = 0;
  
    for (const key of Object.keys(data)) {
      if (["monthlyExpenses", "operatingExpenses", "incomeProfitability"].includes(key)) continue;
  
      const property = data[key];
  
      // Add rent
      const rent = parseFloat(property.rentAmount) || 0;
      totalRent += rent;
  
      // Rental income
      for (const [month, income] of Object.entries(property.rentalIncomeByMonth || {})) {
        const revenue = (income.totalIncome || 0) + (income.lateFee || 0);
        revenueByMonth[month] = (revenueByMonth[month] || 0) + revenue;
        totalRevenue += revenue;
      }
  
      // Other income
      for (const item of property.otherIncome || []) {
        const month = item.date?.slice(0, 3); // e.g., "Jan"
        const amount = item.amount || 0;
        if (month) {
          revenueByMonth[month] = (revenueByMonth[month] || 0) + amount;
          totalRevenue += amount;
        }
      }
    }
  
    const monthlyRevenue = monthOrder.map((month) => ({
      month,
      revenue: revenueByMonth[month] || 0,
    }));
  
    const insights = {
      totalRevenue,
      totalRent,
      "2024": monthlyRevenue,
    };
  
    return insights;
  }
  