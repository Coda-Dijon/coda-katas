cmake_minimum_required(VERSION 4.0)
project(visionProtocol C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(visionProtocol
        visionProtocol.c
        visionProtocol.h
        main.c)

# unit tests
add_executable(visionProtocol_tests
        test_visionProtocol.c
        visionProtocol.c
        visionProtocol.h
)
