"""
===========================================================
Thermal Label Inspector

Reads one MATLAB Ground Truth file and prints its structure.

Author: Quantum Fusion Team
===========================================================
"""

from pathlib import Path
from pprint import pprint

from mcos_decoder import load_groundtruth


LABEL_FILE = Path(
    "datasets/thermal/raw/Data/Video_IR/IR_DRONE_014_LABELS.mat"
)


def main():

    print("=" * 60)
    print("THERMAL LABEL INSPECTOR")
    print("=" * 60)

    print(f"\nReading:\n{LABEL_FILE}\n")

    gt = load_groundtruth(LABEL_FILE)

    print("=" * 60)
    print("TYPE")
    print("=" * 60)
    print(type(gt))

    print("\n")

    print("=" * 60)
    print("ATTRIBUTES")
    print("=" * 60)
    pprint(dir(gt))

    print("\n")

    print("=" * 60)
    print("OBJECT")
    print("=" * 60)
    pprint(gt)


if __name__ == "__main__":
    main()