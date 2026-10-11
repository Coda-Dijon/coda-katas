cmake_minimum_required(VERSION 4.0)
project(avengersUniqueness C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(avengersUniqueness
        avengersUniqueness.c
        avengersUniqueness.h
        main.c)

# unit tests
add_executable(avengersUniqueness_tests
        test_avengersUniqueness.c
        avengersUniqueness.c
        avengersUniqueness.h
)
