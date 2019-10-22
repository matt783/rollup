import numpy as np
from sklearn.linear_model import LinearRegression

# LR for Constrains(TXs, levels)

# Read data from metrics.csv
raw_data = np.genfromtxt('metrics.csv', delimiter=',', skip_header=1)
# txs_and_levels = [[n_transactions_0, levels_0], [n_transactions_1, levels_1], ...]
txs_and_levels = raw_data[:,0:2]
# constraints = [n_constraints_0, n_constraints_1, ...]
constraints = raw_data[:,2]
# Create LR model
model = LinearRegression().fit(txs_and_levels, constraints)
print("constraints(n_transactions, n_levels) = " +str(model.intercept_)+ " + n_transactions*" +str(model.coef_[0])+ " + n_levels*" +str(model.coef_[1]))


# LR for Time(constrains)
raw_data = np.genfromtxt('cuda_metrics.csv', delimiter='\t', skip_header=1)
n_cons=np.reshape(2**(raw_data[:,0]), (-1,1))
print(n_cons)
model = LinearRegression().fit(n_cons, raw_data[:,1])
print("seconds(constraints) = " +str(model.intercept_)+ " + n_constraints*" +str(model.coef_[0]))
