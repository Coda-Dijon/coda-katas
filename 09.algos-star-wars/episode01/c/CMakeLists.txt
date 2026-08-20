cmake_minimum_required(VERSION 4.0)
project(skywalkerPower C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(skywalkerPower
        skywalkerPower.c
        skywalkerPower.h
        main.c)

# unit tests
add_executable(skywalkerPower_tests
        test_skywalkerPower.c
        skywalkerPower.c
        skywalkerPower.h
)
