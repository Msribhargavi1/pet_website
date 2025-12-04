package com.petcare.dto;

import java.time.LocalDateTime;

/**
 * Generic API response wrapper using Java Record (Java 17+)
 * Eliminates boilerplate code for getters, setters, equals, hashCode, toString
 */
public record ApiResponse<T>(
    boolean success,
    String message,
    T data,
    LocalDateTime timestamp
) {
    // Compact constructor for validation
    public ApiResponse {
        if (timestamp == null) {
            timestamp = LocalDateTime.now();
        }
    }
    
    // Static factory methods for common responses
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "Success", data, LocalDateTime.now());
    }
    
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data, LocalDateTime.now());
    }
    
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null, LocalDateTime.now());
    }
}
