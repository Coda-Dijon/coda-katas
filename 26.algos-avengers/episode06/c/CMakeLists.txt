cmake_minimum_required(VERSION 4.0)
project(alertThreshold C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(alertThreshold
        alertThreshold.c
        alertThreshold.h
        main.c)

# unit tests
add_executable(alertThreshold_tests
        test_alertThreshold.c
        alertThreshold.c
        alertThreshold.h
)
