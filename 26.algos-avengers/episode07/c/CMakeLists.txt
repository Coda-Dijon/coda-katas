cmake_minimum_required(VERSION 4.0)
project(avengersRanking C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(avengersRanking
        avengersRanking.c
        avengersRanking.h
        main.c)

# unit tests
add_executable(avengersRanking_tests
        test_avengersRanking.c
        avengersRanking.c
        avengersRanking.h
)
