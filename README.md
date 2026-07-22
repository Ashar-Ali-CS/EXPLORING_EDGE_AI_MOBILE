# Exploring Edge AI Mobile 📱

A React Native Android application exploring on-device AI inference using quantized language models.

## Overview

This project investigates the deployment of small Large Language Models (LLMs) directly on mobile devices, enabling offline AI inference without relying on cloud APIs.

The application uses:

- React Native
- react-native-executorch
- ExecuTorch runtime
- Qwen2.5 0.5B quantized LLM

## Current Implementation

The app successfully loads and runs a quantized Qwen2.5 0.5B model locally on an Android device.

Current features:

- ✅ On-device LLM inference
- ✅ Offline text generation
- ✅ React Native mobile interface
- ✅ Model loading and execution through ExecuTorch

## Observations

The prototype demonstrates the feasibility of running small language models on mobile hardware.

Current limitations:

- Small model size results in occasional hallucinations
- Single-turn generation only
- No persistent conversation memory
- Limited prompt optimisation

## Future Work

Potential improvements:

- Experiment with larger quantized models
- Implement conversation history using local storage
- Explore prompt engineering strategies
- Investigate multimodal edge AI models
- Build a focused user application around an on-device AI capability

## Motivation

This project explores the future of private, offline AI applications where users can run AI capabilities directly on their own devices.