import numpy as np

from sensor_fusion.detector import MultiSensorDetector

detector = MultiSensorDetector()

acoustic = np.random.rand(86).astype(np.float32)

thermal = np.random.rand(44).astype(np.float32)

radar = np.random.rand(34).astype(np.float32)

result = detector.detect(
    acoustic,
    thermal,
    radar
)

print("\n========== FINAL RESULT ==========\n")

for key, value in result.items():
    print(f"{key:20}: {value}")