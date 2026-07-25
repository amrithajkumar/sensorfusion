from pathlib import Path
import numpy as np

# Path to the original SAAB dataset
INPUT_FILE = Path(
    r"D:\quantum\sensorfusion\datasets\radar\raw\data_SAAB_SIRS_77GHz_FMCW.npy"
)

# Output directory
OUTPUT_DIR = Path(
    r"D:\quantum\sensorfusion\datasets\radar\samples"
)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

print("Loading SAAB radar dataset...")
data = np.load(INPUT_FILE, allow_pickle=True)

print(f"Found {len(data)} radar samples.\n")

for i, sample in enumerate(data):
    iq_matrix = sample[1]  # IQ matrix

    output_path = OUTPUT_DIR / f"sample_{i:03d}.npy"

    np.save(output_path, iq_matrix)

    print(f"Saved {output_path.name}")

print("\nDone!")