import numpy as np

from models.acoustic_model import AcousticModel

model = AcousticModel()

model.load_model()

sample = np.random.rand(86).astype(np.float32)

prediction = model.predict(sample)

probability = model.predict_proba(sample)

print("Prediction :", prediction)
print("Probability:", probability)