cmake_minimum_required(VERSION 4.0)
project(midichlorians C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(midichlorians
        midichlorians.c
        midichlorians.h
        main.c)

# unit tests
add_executable(midichlorians_tests
        test_midichlorians.c
        midichlorians.c
        midichlorians.h
)
