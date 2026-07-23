import numpy as np

data = np.load(
    "datasets/radar/raw/data_SAAB_SIRS_77GHz_FMCW.npy",
    allow_pickle=True
)

print("Shape:", data.shape)

print("\nType of first row:")
print(type(data[0]))

print("\nFirst row:")
print(data[0])

print("\n")

for i in range(6):
    print(f"Column {i}")
    print(type(data[0][i]))

    try:
        print("Shape:", np.shape(data[0][i]))
    except:
        pass

    print("----------------------")