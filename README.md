# Problem: Asynchronous Weather Data Aggregator

## Background

You are developing a service that aggregates weather data from multiple weather APIs and provides a consolidated report. This service should handle API requests asynchronously and efficiently combine the results.

## Task

**API Request Functions**: Create several asynchronous functions, each representing a call to a different mock weather API. These functions should return weather data in different structures (e.g., one returns temperature and humidity, another returns wind speed and precipitation).

**Data Aggregation Function**: Implement a function named aggregateWeatherData. This function should call the API functions concurrently and then aggregate the results into a single weather report object.

**Error Handling**: Implement robust error handling in aggregateWeatherData. If one API request fails, the function should still return a report with the data from the successful requests and a corresponding error message for the failed request.

**Types/Interfaces**: Define appropriate interfaces or types for the API responses and the aggregated report. Ensure type safety throughout your implementation.

**Caching Mechanism**: (Optional) Implement a simple in-memory caching mechanism to store and reuse API responses. The cache should have a predefined expiry time.

**Testing**: Write test cases to demonstrate that your function correctly aggregates data from multiple sources and handles partial failures.

## Requirements

- Use an explicitly typed language for the implementation.
- Simulate API requests using asynchronous functions with timeouts and mock data.
- Ensure your code is well-organized and follows best practices for readability and maintainability.

This exercise tests your ability to work with asynchronous operations, integrate with multiple APIs, handle partial failures, and aggregate data efficiently.
