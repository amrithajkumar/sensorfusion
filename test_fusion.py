import numpy as np

from sensor_fusion.fusion import SensorFusion


fusion = SensorFusion()

acoustic_probability = 0.92

thermal = np.random.rand(44)

radar = np.random.rand(34)

result = fusion.fuse(

    acoustic_probability,

    thermal,

    radar

)

print(result)