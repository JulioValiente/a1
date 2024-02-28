const express = require('express');
const supa = require('@supabase/supabase-js');

const app = express();


const supaUrl = 'https://fzuyfflwpoezkglnapba.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dXlmZmx3cG9lemtnbG5hcGJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5OTMyODksImV4cCI6MjAyNDU2OTI4OX0.t1KC5DQMKoNgp79Hqxqcl0mHmry093omhQnOFi-e2-Q';

const supabase = supa.createClient(supaUrl, supaAnonKey);



app.get('/api/seasons', async(req, res)=>{

const{data, error}= await supabase
    .from('seasons')
    .select();
    res.send(data)


});

app.get('/api/circuits', async(req, res)=>{

    const{data, error}= await supabase
        .from('circuits')
        .select();
        res.send(data)
    
    
    });

app.get('/api/circuits/:ref', async(req, res)=>{

        const{data, error}= await supabase
            .from('seasons')
            .select()
            .eq('circuitRef', req.params.ref);
            res.send(data)
        
        
    });
    app.get('/api/circuits/seasons/:year', async(req, res)=>{

        const{data, error}= await supabase
            .from('seasons')
            .select('circuits()')
            .eq('circuitRef', req.params.ref);
            res.send(data)
        
        
    });

app.get('/api/constructors', async(req, res)=>{

        const{data, error}= await supabase
            .from('constructors')
            .select();
           
            res.send(data)
        
        
        });
        
        
app.get('/api/constructors/:ref', async(req, res)=>{

        const{data, error}= await supabase
                .from('constructors')
                .select()
                .eq('contructorRef',req.params.ref );
               
                res.send(data)
            
            
            });

app.get('/api/circuits/:ref', async(req, res)=>{

        const{data, error}= await supabase
            .from('seasons')
            .select()
            .eq('circuitRef', req.params.ref);
            res.send(data)
        
        
    });

    app.get('/api/drivers/:ref', async(req, res)=>{

        const{data, error}= await supabase
            .from('drivers')
            .select();
            res.send(data)
        
        
    });

    app.get('/api/drivers/:ref', async(req, res)=>{

        const{data, error}= await supabase
            .from('drivers')
            .select()
            .eq('driverRef', req.params.ref);
            res.send(data)
        
        
    });

    app.get('/api/drivers/search/:sub', async(req, res)=>{

        const{data, error}= await supabase
            .from('drivers')
            .select()
            .like('surname', req.params.sub);
            res.send(data)
        
        
    });

    app.get('/api/drivers/race/:ref', async(req, res)=>{

        const{data, error}= await supabase
            .from('races')
            .select('drivers()')
            .eq('raceId', req.params.ref);
            res.send(data)
        
        
    });
    app.get('/api/races/:ref', async(req, res)=>{

        const{data, error}= await supabase
            .from('races')
            .select('circuits(name, location, country)')
            .eq('raceId', req.params.ref);
            res.send(data)
        
        
    });
    app.get('/api/races/season/:year', async(req, res)=>{

        const{data, error}= await supabase
            .from('seasons')
            .select('races()')
            .eq('year', req.params.ref);
            res.send(data)
        
        
    });
    app.get('/api/drivers/race/:ref', async(req, res)=>{

        const{data, error}= await supabase
            .from('races')
            .select('drivers()')
            .eq('raceId', req.params.ref);
            res.send(data)
        
        
    });

    app.get('/api/races/seasons/:year/:round', async(req, res)=>{

        const{data, error}= await supabase
            .from('seasons')
            .select('races(*)')
            .eq('seasons.year', req.params.year)
            .eq('races.round', req.params.round);
            res.send(data)
        
        
    });

    app.get('/api/drivers/race/:ref', async(req, res)=>{

        const{data, error}= await supabase
            .from('races')
            .select('drivers()')
            .eq('raceId', req.params.ref);
            res.send(data)
        
        
    });

    app.get('/api/races/circuits/:ref', async(req, res)=>{

        const{data, error}= await supabase
            .from('races')
            .select()
            .eq('circuitRef', req.params.ref);
            res.send(data)
        
        
    });

    app.get('/api/races/circuits/:ref/season/:start/:end', async(req, res)=>{

        const{data, error}= await supabase
            .from('races')
            .select('drivers(driverRef, code, forename, surname), race(name, round, year, date), constructor(name, constructorRef, nationality')
            .eq('circuitRef', req.params.ref)
            .rangeLte('year', req.params.start, req.params.end);
            res.send(data)
        
        
    });

    app.get('/api/results/:ref', async(req, res)=>{

        const{data, error}= await supabase
            .from('results')
            .select('driver(driverRef, code, forename, surname), race(name, round, year, date), constuctor(name, constructorRef, nationality')
            .eq('races.raceId', req.params.ref)
            .order('grid', {ascending: true});
            res.send(data)
        
        
    });

    app.get('/api/results/driver/:ref', async(req, res)=>{

        const{data, error}= await supabase
            .from('results')
            .select('drivers(driverRef)')
            .eq('driverRef', req.params.ref);
            res.send(data)
        
        
    });


    app.get('/api/qualifying/:ref', async(req, res)=>{

        const{data, error}= await supabase
            .from('qualifying')
            .select('races(*)')
            .eq('races.raceId', req.params.ref)
            .eq('races.raceId', 'qualifying.raceId');
            res.send(data)
        
        
    });

    app.get('/api/standings/:ref/drivers', async(req, res)=>{

        const{data, error}= await supabase
            .from('driverStandings')
            .select()
            .eq('raceId', req.params.ref)
            .eq('races.raceId', 'driverStandings.raceId')
            .order('position',{ascending: true});
            res.send(data)
        
        
    });

    app.get('/api/standings/:ref/constructors', async(req, res)=>{

        const{data, error}= await supabase
            .from('constructorStandings')
            .select()
            .eq('raceId', req.params.ref)
            .eq('constructorStandings.raceId', 'races.raceId')
            .order('position', {ascending: true});
            res.send(data)
        
        
    });




app.listen(8080, ()=> {
    console.log('listening on port 8080');

});