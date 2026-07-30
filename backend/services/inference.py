import time
from pathlib import Path
from typing import Optional

from backend.logs.logger import logger

from backend.services.feature_service import FeatureService
from backend.services.reliability_service import ReliabilityService
from backend.services.optimization_service import OptimizationService

from sensor_fusion.detector import MultiSensorDetector
from sensor_fusion.fusion_engine import FusionEngine


class InferenceService:

    def __init__(self):

        # --------------------------------------------------
        # Services
        # --------------------------------------------------

        self.feature_service = FeatureService()

        self.reliability = ReliabilityService()

        self.optimization = OptimizationService()

        # --------------------------------------------------
        # AI Components
        # --------------------------------------------------

        self.detector = MultiSensorDetector()

        self.fusion = FusionEngine()

    def predict(

        self,
        radar_file: Optional[Path],
        thermal_file: Optional[Path],
        acoustic_file: Optional[Path],

    ):

        try:

            # ======================================================
            # Total Runtime
            # ======================================================

            start_time = time.perf_counter()

            logger.info("=" * 60)

            logger.info("STARTING MULTI-SENSOR INFERENCE")

            logger.info("=" * 60)

            # ======================================================
            # FEATURE EXTRACTION
            # ======================================================

            radar_features = None
            thermal_features = None
            acoustic_features = None

            if radar_file is not None:
                logger.info("Extracting Radar features...")
                radar_features = self.feature_service.extract_radar(
                    radar_file
                )

            if thermal_file is not None:
                logger.info("Extracting Thermal features...")
                thermal_features = self.feature_service.extract_thermal(
                    thermal_file
                )

            if acoustic_file is not None:
                logger.info("Extracting Acoustic features...")
                acoustic_features = self.feature_service.extract_acoustic(
                    acoustic_file
                )


            logger.info("Feature Extraction Completed")

            # ======================================================
            # INDIVIDUAL SENSOR PREDICTIONS
            # ======================================================

            radar_probability = self.detector.radar_probability(

                radar_features

            )

            thermal_probability = self.detector.thermal_probability(

                thermal_features

            )

            acoustic_probability = self.detector.acoustic_probability(

                acoustic_features

            prediction = self.detector.detect(
                radar_features=radar_features,
                thermal_features=thermal_features,
                acoustic_features=acoustic_features,

            )

            logger.info(

                f"Radar Probability    : {radar_probability:.4f}"

            )

            logger.info(

                f"Thermal Probability : {thermal_probability:.4f}"

            )

            logger.info(

                f"Acoustic Probability: {acoustic_probability:.4f}"

            )

            # ======================================================
            # SENSOR RELIABILITY
            # ======================================================

            sensor_reliability = self.reliability.estimate(

                radar_probability,

                thermal_probability,

                acoustic_probability,

            )

            logger.info(

                f"Sensor Reliability : {sensor_reliability}"

            )

            # ======================================================
            # SHARED EVALUATION FUNCTION
            # Used by BOTH Quantum and Classical Optimizers
            # ======================================================

            def evaluation_function(

                acoustic_weight,

                thermal_weight,

                radar_weight,

            ):

                fusion_score = (

                    radar_weight

                    * radar_probability

                    * sensor_reliability["radar"]

                    +

                    thermal_weight

                    * thermal_probability

                    * sensor_reliability["thermal"]

                    +

                    acoustic_weight

                    * acoustic_probability

                    * sensor_reliability["acoustic"]

                )

                agreement = (

                    1.0

                    -

                    (

                        abs(

                            radar_probability

                            - thermal_probability

                        )

                        +

                        abs(

                            radar_probability

                            - acoustic_probability

                        )

                        +

                        abs(

                            thermal_probability

                            - acoustic_probability

                        )

                    ) / 3.0

                )

                agreement = max(

                    0.0,

                    agreement

                )

                balance = (

                    1.0

                    -

                    (

                        abs(

                            radar_weight

                            - thermal_weight

                        )

                        +

                        abs(

                            radar_weight

                            - acoustic_weight

                        )

                        +

                        abs(

                            thermal_weight

                            - acoustic_weight

                        )

                    ) / 3.0

                )

                balance = max(

                    0.0,

                    balance

                )

                score = (

                    0.60 * fusion_score

                    +

                    0.25 * agreement

                    +

                    0.15 * balance

                )
                return float(score)
            # ======================================================
            # OPTIMIZATION
            # Quantum + Classical
            # ======================================================

            optimization = self.optimization.optimize(

                evaluation_function

            )

            # ------------------------------------------------------
            # Quantum Results
            # ------------------------------------------------------

            quantum_weights = (

                optimization["quantum"]["weights"]

            )

            quantum_score = (

                optimization["quantum"]["score"]

            )

            quantum_runtime = (

                optimization["quantum"]["runtime"]

            )

            logger.info(

                f"Quantum Weights : {quantum_weights}"

            )

            logger.info(

                f"Quantum Score : {quantum_score:.4f}"

            )

            logger.info(

                f"Quantum Runtime : {quantum_runtime:.4f}s"

            )

            # ------------------------------------------------------
            # Classical Results
            # ------------------------------------------------------

            classical_weights = (

                optimization["classical"]["weights"]

            )

            classical_score = (

                optimization["classical"]["score"]

            )

            classical_runtime = (

                optimization["classical"]["runtime"]

            )

            logger.info(

                f"Classical Weights : {classical_weights}"

            )

            logger.info(

                f"Classical Score : {classical_score:.4f}"

            )

            logger.info(

                f"Classical Runtime : {classical_runtime:.4f}s"

            )

            # ------------------------------------------------------
            # Performance Comparison
            # ------------------------------------------------------

            improvement = (

                optimization["improvement"]

            )

            logger.info(

                f"Quantum Improvement : {improvement:.2f}%"

            )

            # ======================================================
            # FINAL DETECTION
            # Uses Quantum Optimized Weights
            # ======================================================

            prediction = self.detector.detect(

                radar_features,

                thermal_features,

                acoustic_features,

                weights=quantum_weights,

            )

            logger.info(

                f"Prediction = {prediction['prediction']}"

            )

            logger.info(

                f"Confidence = {prediction['confidence']:.4f}"

            )

            # ======================================================
            # TOTAL RUNTIME
            # ======================================================

            total_runtime = round(

                time.perf_counter()

                -

                start_time,

                3

            )

            # ======================================================
            # FINAL FUSION SCORE
            # ======================================================

            fusion_score = (

                quantum_weights["radar"]

                * radar_probability

                +

                quantum_weights["thermal"]

                * thermal_probability

                +

                quantum_weights["acoustic"]

                * acoustic_probability

            )
                        # ======================================================
            # THREAT ANALYSIS
            # ======================================================

            confidence = prediction["confidence"]

            if confidence >= 0.90:

                threat_level = "CRITICAL"

            elif confidence >= 0.75:

                threat_level = "HIGH"

            elif confidence >= 0.50:

                threat_level = "MEDIUM"

            else:

                threat_level = "LOW"

            # ======================================================
            # MISSION STATUS
            # ======================================================

            detected = (

                prediction["prediction"].lower()

                ==

                "drone"

            )

            if detected:

                mission_status = "THREAT DETECTED"

                recommended_action = (

                    "Track target and notify command center"

                )

            else:

                mission_status = "AREA CLEAR"

                recommended_action = (

                    "Continue surveillance"

                )

            # ======================================================
            # RESPONSE
            # ======================================================

            response = {

                "prediction": prediction["prediction"],

                "confidence": round(

                    confidence,

                    4

                ),

                "detected": detected,

                "sensor_probabilities": {

                    "radar": round(

                        radar_probability,

                        4

                    ),

                    "thermal": round(

                        thermal_probability,

                        4

                    ),

                    "acoustic": round(

                        acoustic_probability,

                        4

                    ),

                },

                "sensor_reliability": sensor_reliability,

                "quantum": {

                    "weights": {

                        key: round(value, 4)

                        for key, value in quantum_weights.items()

                    },

                    "score": round(

                        quantum_score,

                        4

                    ),

                    "runtime_seconds": quantum_runtime,

                },

                "classical": {

                    "weights": {

                        key: round(value, 4)

                        for key, value in classical_weights.items()

                    },

                    "score": round(

                        classical_score,

                        4

                    ),

                    "runtime_seconds": classical_runtime,

                },

                "comparison": {

                    "quantum_improvement_percent": round(

                        improvement,

                        2

                    )

                },

                "fusion_score": round(

                    fusion_score,

                    4

                ),

                "mission_status": mission_status,

                "threat_level": threat_level,

                "recommended_action": recommended_action,

                "total_runtime_seconds": total_runtime,

            }

            # ======================================================
            # FINAL LOGS
            # ======================================================

            logger.info("=" * 60)

            logger.info("MULTI-SENSOR INFERENCE COMPLETED")

            logger.info("=" * 60)

            logger.info(

                f"Prediction          : {response['prediction']}"

            )

            logger.info(

                f"Confidence          : {response['confidence']:.4f}"

            )

            logger.info(

                f"Threat Level        : {threat_level}"

            )

            logger.info(

                f"Mission Status      : {mission_status}"

            )

            logger.info(

                f"Quantum Score       : {quantum_score:.4f}"

            )

            logger.info(

                f"Classical Score     : {classical_score:.4f}"

            )

            logger.info(

                f"Improvement         : {improvement:.2f}%"

            )

            logger.info(

                f"Fusion Score        : {fusion_score:.4f}"

            )

            logger.info(

                f"Total Runtime       : {total_runtime:.3f}s"

            )

            logger.info("=" * 60)

            return response

        except Exception as e:

            logger.exception(

                "Multi-Sensor Inference Failed"

            )

            raise